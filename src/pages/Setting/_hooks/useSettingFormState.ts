import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import { LeadSettingSchema } from '../../../schema/LeadSettingSchema';
import useFetch from '../../../composables/useFetch';
import toast from 'react-hot-toast';
import { useContext, useState } from 'react';
import Modal from 'bootstrap/js/dist/modal';
import { CHANNEL_URL, MEDIA_URL, PROBABILITY_URL, SOURCE_URL, STATUS_URL, TYPE_URL } from '../../../config/api';
import { useSearchParams } from 'react-router-dom';
import { SettingContext } from './context/SettingContext';

export default function useSettingFormState() {
  const [isEdit, setIsEdit] = useState(false);
  const [idSetting, setIdSetting] = useState('');
  const { fetchOptions } = useContext(SettingContext);
  const { $fetch } = useFetch();
  const [searchParams, setSearchParams] = useSearchParams();

  const [tab, setTab] = useState(searchParams.get('tab') || TYPE_URL);
  const tabs = [
    {
      label: "Type",
      value: TYPE_URL,
    },
    {
      label: "Channel",
      value: CHANNEL_URL,
    },
    {
      label: "Media",
      value: MEDIA_URL,
    },
    {
      label: "Source",
      value: SOURCE_URL,
    },
    {
      label: "Probability",
      value: PROBABILITY_URL,
    },
    {
      label: "Status",
      value: STATUS_URL,
    },
  ];

  const handleChangeTab = (value: string) => {
    setTab(value);
    setSearchParams({ tab: value });
  }

  const getLabelTab = () => {
    const label = tabs.find((item) => item.value === tab);
    return label ? `Lead ${label.label}` : "";
  };

  const defaultValues: z.infer<typeof LeadSettingSchema> = {
    name: "",
    description: "",
  }

  const form = useForm<z.infer<typeof LeadSettingSchema>>({
    resolver: zodResolver(LeadSettingSchema),
    defaultValues,
  });

  async function onSubmit(data: z.infer<typeof LeadSettingSchema>){
    try {
      let url = tab
      if(isEdit){
        url = `${tab}/${data.id}`
      }
      await $fetch(url, {
        method: isEdit ? 'PATCH' : 'POST',
        data
      })
      const btnCloseModal = document.getElementById('btn-close-modal') as HTMLButtonElement
      btnCloseModal.click()
      if(fetchOptions) {
        fetchOptions();
      }
      toast.success('Setting has been saved.')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const validationErrors = err.response?.data?.errors
      // if status 422, show validation
      if(err.response.status === 422){
        if(validationErrors){
          toast.error(validationErrors[Object.keys(validationErrors)[0]][0])
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  // call API to delete a lead setting
  async function onDelete(){
    try {
      await $fetch(`${tab}/${idSetting}`, {
        method: 'DELETE'
      })
      const btnCloseModal = document.getElementById('btn-close-confirm-delete') as HTMLButtonElement
      btnCloseModal.click()
      if(fetchOptions) {
        fetchOptions();
      }
      toast.success('Setting has been deleted.')
      setIdSetting('');
    } catch (err) {
      toast.error('Something went wrong. Please try again later.')
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onInvalid = (data: any) => {
    console.log(data);
  }

  // show modal confirm to perform delete
  const handleDelete = (id: string) => {
    setIdSetting(id);
    const formModal = new Modal('#modalConfirmDelete') 
    formModal.show()
  }

  // show modal form to edit
  const handleEdit = (item: z.infer<typeof LeadSettingSchema>) => {
    setIsEdit(true);
    form.reset(item);
    const formModal = new Modal('#modal') 
    formModal.show()
  }

  // show modal form to add
  const handleAdd = () => {
    // if tab is source or media, reset the form with default values and set the media_id or channel_id to null
    if(tab == SOURCE_URL){
      form.reset({...defaultValues, media_id: null});
    }
    else if(tab == MEDIA_URL){
      form.reset({...defaultValues, channel_id: null});
    }
    else {
      form.reset(defaultValues);
    }
    const formModal = new Modal('#modal') 
    formModal.show()
    setIsEdit(false);
  }

  return {
    tab,
    handleChangeTab,
    tabs,
    getLabelTab,
    form,
    onSubmit,
    onInvalid,
    onDelete,
    handleDelete,
    handleEdit,
    handleAdd,
    isEdit,
  }
}
