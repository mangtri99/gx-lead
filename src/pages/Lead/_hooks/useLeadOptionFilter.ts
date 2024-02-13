import { useMemo, useState } from "react";
import { APIResponse, Option, OptionMedia, OptionSource, SelectOptions } from "../../../config/types";
import useFetch from "../../../composables/useFetch";
import { BRANCH_URL, CHANNEL_URL, MEDIA_URL, PROBABILITY_URL, SOURCE_URL, STATUS_URL, TYPE_URL } from "../../../config/api";

export default function useLeadOptionFilter() {
  type SelectMediaOptions = SelectOptions & { channel_id: number };
  type SelectSourceOptions = SelectOptions & { media_id: number };

  const [branch, setBranch] = useState<SelectOptions[]>();
  const [statuses, setStatuses] = useState<SelectOptions[]>();
  const [probabilities, setProbabilities] = useState<SelectOptions[]>();
  const [types, setTypes] = useState<SelectOptions[]>();
  const [channels, setChannels] = useState<SelectOptions[]>();
  const [media, setMedia] = useState<SelectMediaOptions[]>();
  const [sources, setSources] = useState<SelectSourceOptions[]>();

  const { $fetch } = useFetch();
  const fetchOptions = async () => {
    try {
      Promise.all([
        $fetch<APIResponse<Option[]>>(BRANCH_URL, {
          method: "GET",
        }).then((res) => {
          const response = res.data.data;
          const branch = response.map((item) => {
            return {
              value: String(item.id),
              label: item.name,
            };
          })
          setBranch(branch);
        }),

        $fetch<APIResponse<Option[]>>(STATUS_URL, {
          method: "GET",
        }).then((res) => {
          const response = res.data.data;
          const status = response.map((item) => {
            return {
              value: String(item.id),
              label: item.name,
            };
          });
          setStatuses(status);
        }),

        $fetch<APIResponse<Option[]>>(PROBABILITY_URL, {
          method: "GET",
        }).then((res) => {
          const response = res.data.data;
          const probability = response.map((item) => {
            return {
              value: String(item.id),
              label: item.name,
            };
          });
          setProbabilities(probability);
        }),

        $fetch<APIResponse<Option[]>>(TYPE_URL, {
          method: "GET",
        }).then((res) => {
          const response = res.data.data;
          const type = response.map((item) => {
            return {
              value: String(item.id),
              label: item.name,
            };
          });
          setTypes(type);
        }),

        $fetch<APIResponse<Option[]>>(CHANNEL_URL, {
          method: "GET",
        }).then((res) => {
          const response = res.data.data;
          const channel = response.map((item) => {
            return {
              value: String(item.id),
              label: item.name,
            };
          });
          setChannels(channel);
        }),

        $fetch<APIResponse<OptionMedia[]>>(MEDIA_URL, {
          method: "GET",
        }).then((res) => {
          const response = res.data.data;
          const media = response.map((item) => {
            return {
              value: String(item.id),
              label: item.name,
              channel_id: item.channel_id,
            };
          });
          setMedia(media);
        }),

        $fetch<APIResponse<OptionSource[]>>(SOURCE_URL, {
          method: "GET",
        }).then((res) => {
          const response = res.data.data;
          const source = response.map((item) => {
            return {
              value: String(item.id),
              label: item.name,
              media_id: item.media_id,
            };
          });
          setSources(source);
        }),
      ]);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
    }
  };

  useMemo(() => {
    fetchOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    branch,
    statuses,
    probabilities,
    types,
    channels,
    media,
    sources,
    fetchOptions,
  };
}
