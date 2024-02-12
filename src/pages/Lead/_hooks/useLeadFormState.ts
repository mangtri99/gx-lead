/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import { LeadSchema } from '../../../schema/LeadSchema';
import { useEffect, useMemo, useState } from 'react';
import useFetch from '../../../composables/useFetch';
import { APIResponse, Option, OptionMedia, OptionSource } from '../../../config/types';
import { BRANCH_URL, CHANNEL_URL, LEADS_URL, MEDIA_URL, PROBABILITY_URL, SOURCE_URL, STATUS_URL, TYPE_URL } from '../../../config/api';
import { useParams } from 'react-router-dom';

interface Props {
  isEdit: boolean
}


export default function useLeadOptionFilter(props: Props) {
  const { isEdit } = props;

  const params = useParams<{ id: string }>();
  const [branches, setBranches] = useState<any>();
  const [statuses, setStatuses] = useState<any>();
  const [probabilities, setProbabilities] = useState<any>();
  const [types, setTypes] = useState<any>();
  const [channels, setChannels] = useState<any>();
  const [sources, setSources] = useState<any>();
  const [media, setMedia] = useState<any>();

  const coverages = [
    {
      value: '1',
      label: "Yes",
    },
    {
      value: '0',
      label: "No",
    }
  ]

  const { $fetch } = useFetch();
  const fetchLead = async () => {
    try {
      const res = await $fetch(`${LEADS_URL}/${params.id}`, {
        method: 'GET',
      })
      form.reset(res.data.data)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err.response.data.message)
    }
  }

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
          setBranches(branch);
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
          const status = response.map((item) => {
            return {
              value: String(item.id),
              label: item.name,
            };
          });
          setProbabilities(status);
        }),

        $fetch<APIResponse<Option[]>>(TYPE_URL, {
          method: "GET",
        }).then((res) => {
          const response = res.data.data;
          const status = response.map((item) => {
            return {
              value: String(item.id),
              label: item.name,
            };
          });
          setTypes(status);
        }),

        $fetch<APIResponse<Option[]>>(CHANNEL_URL, {
          method: "GET",
        }).then((res) => {
          const response = res.data.data;
          const status = response.map((item) => {
            return {
              value: String(item.id),
              label: item.name,
            };
          });
          setChannels(status);
        }),

        $fetch<APIResponse<OptionSource[]>>(SOURCE_URL, {
          method: "GET",
        }).then((res) => {
          const response = res.data.data;
          const status = response.map((item) => {
            return {
              value: String(item.id),
              label: item.name,
              media_id: String(item.media_id)
            };
          });
          setSources(status);
        }),

        $fetch<APIResponse<OptionMedia[]>>(MEDIA_URL, {
          method: "GET",
        }).then((res) => {
          const response = res.data.data;
          const status = response.map((item) => {
            return {
              value: String(item.id),
              label: item.name,
              channel_id: String(item.channel_id)
            };
          });
          setMedia(status);
        }),
      ]);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    // if edit mode, fetch lead
    if(isEdit){
      fetchLead();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useMemo(() => {
    fetchOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const form = useForm<z.infer<typeof LeadSchema>>({
    resolver: zodResolver(LeadSchema),
    defaultValues: {
      
    },
  });

  const onSubmit = (data: z.infer<typeof LeadSchema>) => {
    // login user
    console.log(data);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onInvalid = (data: any) => {
    console.log(data);
  }

  return {
    form,
    onSubmit,
    onInvalid,
    options: {
      statuses,
      branches,
      probabilities,
      types,
      channels,
      sources,
      media,
      coverages
    }
  }
}
