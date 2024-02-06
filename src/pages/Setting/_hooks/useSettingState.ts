import React, { useMemo } from 'react'
import { APIResponse, Option, OptionMedia, OptionSource } from '../../../config/types';
import { CHANNEL_URL, MEDIA_URL, PROBABILITY_URL, SOURCE_URL, STATUS_URL, TYPE_URL } from '../../../config/api';
import useFetch from '../../../composables/useFetch';


export default function useSettingState() {
  const [types, setTypes] = React.useState<Option[]>();
  const [channels, setChannels] = React.useState<Option[]>();
  const [media, setMedia] = React.useState<Option[]>();
  const [sources, setSources] = React.useState<Option[]>();
  const [probabilities, setProbabilities] = React.useState<Option[]>();
  const [statuses, setStatuses] = React.useState<Option[]>();

  const { $fetch } = useFetch();
  const fetchOptions = async () => {
    
    try {
      Promise.all([
        $fetch<APIResponse<Option[]>>(TYPE_URL, {
          method: "GET",
        }).then((res) => {
          setTypes(res.data.data);
        }),

        $fetch<APIResponse<Option[]>>(CHANNEL_URL, {
          method: "GET",
        }).then((res) => {
          setChannels(res.data.data);
        }),

        $fetch<APIResponse<OptionMedia[]>>(MEDIA_URL, {
          method: "GET",
        }).then((res) => {
          setMedia(res.data.data);
        }),

        $fetch<APIResponse<OptionSource[]>>(SOURCE_URL, {
          method: "GET",
        }).then((res) => {
          setSources(res.data.data);
        }),

        $fetch<APIResponse<Option[]>>(PROBABILITY_URL, {
          method: "GET",
        }).then((res) => {
          setProbabilities(res.data.data);
        }),

        $fetch<APIResponse<Option[]>>(STATUS_URL, {
          method: "GET",
        }).then((res) => {
          setStatuses(res.data.data);
        }),
      ]);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleDelete = (id: number, setting: string) => {
    console.log(id, setting);
  }

  const handleEdit = (id: number, setting: string) => {
    console.log(id, setting);
  }

  useMemo(() => {
    fetchOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    types,
    channels,
    media,
    sources,
    probabilities,
    statuses,
    handleDelete,
    handleEdit
  }
}
