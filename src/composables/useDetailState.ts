import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { APIResponse } from "../config/types";

interface Props {
  url: string;
}


export default function useDetailState<T>(props: Props) {
  const { url } = props;
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(false)
  const params = useParams();
  const { $fetch } = useFetch();

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await $fetch<APIResponse<T>>(`${url}/${params.id}`, {
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
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    data,
    loading,
  }
}
