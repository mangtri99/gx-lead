import { useEffect, useState } from "react";
import { APIResponse, Lead } from "../../../config/types";
import useFetch from "../../../composables/useFetch";
import { LEADS_URL } from "../../../config/api";
import { useParams } from "react-router-dom";

export default function useLeadDetailState() {
  const [data, setData] = useState<Lead>();
  const [loading, setLoading] = useState(false)
  const params = useParams();
  const { $fetch } = useFetch();

  const fetchLeads = async () => {
    setLoading(true)
    try {
      const res = await $fetch<APIResponse<Lead>>(`${LEADS_URL}/${params.id}`, {
        method: 'GET',
      })
      setData(res.data.data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    data,
    loading,
  }
}
