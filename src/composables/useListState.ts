import { useEffect, useState } from "react";
import useFetch from "./useFetch";
import toast from "react-hot-toast";
import filterQs from "../helper/filterQs";
import { APIResponsePagination } from "../config/types";

interface Params {
  [key: string]: string | undefined
}

interface Props<K> {
  url: string;
  queryParams: K & { page: string };
}

export default function useListState<T, K>(props: Props<K>) {
  const { url, queryParams, } = props;
  const [data, setData] = useState<APIResponsePagination<T[]>>();
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState<typeof queryParams>(queryParams);
  const { $fetch } = useFetch();

  const fetchData = async () => {
    setLoading(true);
    try {
      const filteredQuery = filterQs(query as Params);
      const res = await $fetch<APIResponsePagination<T[]>>(url, {
        method: "GET",
        params: filteredQuery,
      });
      setData(res.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const filter = async () => {
    // when filter is called, set page to 1
    setQuery({
      ...query,
      page: "1",
    });
    fetchData();
  };

  const resetFilter = async () => {
    setQuery(queryParams);
  };

  const handlePagination = (page: string) => {
    if (data) {
      if (page === "prev") {
        setQuery({
          ...query,
          page: `${data?.meta.current_page - 1}`,
        });
      } else if (page === "next") {
        setQuery({
          ...query,
          page: `${data?.meta.current_page + 1}`,
        });
      } else {
        setQuery({
          ...query,
          page,
        });
      }
    }
  };

  const destroy = async (id: string) => {
    try {
      await $fetch(`${url}/${id}`, {
        method: "DELETE",
      });
      fetchData();
      toast.success("Lead deleted successfully");
    } catch (err) {
      toast.error("Something went wrong. Please try again later.");
      console.log(err);
    }
  };

  // fetch immediatly when query.page changes
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.page]);

  return {
    data,
    loading,
    query,
    setQuery,
    filter,
    handlePagination,
    destroy,
    resetFilter,
    fetchData,
  };
}
