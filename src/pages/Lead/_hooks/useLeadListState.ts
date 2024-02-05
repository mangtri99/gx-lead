import  { useEffect, useState } from 'react'
import { APIResponsePagination, Lead } from '../../../config/types';
import { useSearchParams } from 'react-router-dom';
import useFetch from '../../../composables/useFetch';
import { LEADS_URL } from '../../../config/api';
import filterQs from '../../../composables/filterQs';
import toast from 'react-hot-toast';

export default function useLeadListState() {
  const [data, setData] = useState<APIResponsePagination<Lead[]>>();
  const [loading, setLoading] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState({
    search: searchParams.get('search') || '',
    date_start: searchParams.get('date_start') || '',
    date_end: searchParams.get('date_end') || '',
    status: searchParams.get('status') || '',
    branch: searchParams.get('branch') || '',
    page: searchParams.get('page') || '',
  })
  const { $fetch } = useFetch();

  const fetchLeads = async () => {
    setLoading(true)
    try {
      const res = await $fetch<APIResponsePagination<Lead[]>>(LEADS_URL, {
        method: 'GET',
        params: searchParams,
      })
      setData(res.data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const filter = () => {
    const filteredQuery = filterQs(query)
    console.log(filteredQuery)
    setSearchParams(filteredQuery)
  }

  const handlePagination = (page: string) => {
    if(data){
      if (page === "prev") {
        setQuery({
          ...query,
          page: `${data?.meta.current_page - 1}`
        })
      } else if (page === "next") {
        setQuery({
          ...query,
          page: `${data?.meta.current_page + 1}`
        })
      } else {
        setQuery({
          ...query,
          page
        })
      }

      filter()
    }
  }

  const deleteLead = async (id: string) => {
    try {
      await $fetch(`${LEADS_URL}/${id}`, {
        method: 'DELETE'
      })
      fetchLeads()
      toast.success('Lead deleted successfully')
    } catch (err) {
      toast.error('Something went wrong. Please try again later.')
      console.log(err)
    }
  }

  useEffect(() => {
    fetchLeads()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  return {
    data,
    loading,
    query,
    setQuery,
    filter,
    handlePagination,
    deleteLead
  }
}
