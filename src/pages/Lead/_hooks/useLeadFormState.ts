/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import { LeadSchema } from '../../../schema/LeadSchema';
import { 
  useEffect, 
 } from 'react';
import useFetch from '../../../composables/useFetch';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { LEADS_URL } from '../../../config/api';

interface Props {
  isEdit: boolean
}


export default function useLeadFormState(props: Props) {
  const { isEdit } = props;
  const navigate = useNavigate()
  const params = useParams<{ id: string }>();

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

  useEffect(() => {
    // if edit mode, fetch lead
    if(isEdit && params.id){
      fetchLead();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const form = useForm<z.infer<typeof LeadSchema>>({
    resolver: zodResolver(LeadSchema),
    defaultValues: {
      
    },
  });

  const onSubmit = async (data: z.infer<typeof LeadSchema>) => {
    // login user
    try {
      let url = LEADS_URL
      if(isEdit){
        url = `${LEADS_URL}/${data.id}`
      }
      await $fetch(url, {
        method: isEdit ? 'PATCH' : 'POST',
        data: {
          ...data,
          is_coverage: Number(data.is_coverage)
        }
      })
      toast.success('Leads has been saved.')
      if(params.id){
        navigate('/leads')
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const validationErrors = err.response?.data?.errors
      // if status 422, show validation
      if(err.response.status === 422){
        if(validationErrors){
          Object.keys(validationErrors).forEach((key: any) => {
            form.setError(key, {
              type: "manual",
              message: validationErrors[key][0],
            });
          });
        }
      // else, show toast error
      } else {
        toast.error('Something went wrong. Please try again later.')
      }
      
    }
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
      coverages
    }
  }
}
