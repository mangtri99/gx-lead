import { useEffect, useState } from "react";
import { APIResponsePagination, Lead } from "../../../config/types";
import useFetch from "../../../composables/useFetch";
import { LEADS_URL } from "../../../config/api";
import toast from "react-hot-toast";
import filterQs from "../../../helper/filterQs";

export default function useLeadListState() {
  const [data, setData] = useState<APIResponsePagination<Lead[]>>();
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState({
    search: "",
    date_start: "",
    date_end: "",
    status: "",
    probability: "",
    branch: "",
    type: "",
    channel: "",
    media: "",
    source: "",
    page: "",
  });
  const { $fetch } = useFetch();

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const filteredQuery = filterQs(query);
      const res = await $fetch<APIResponsePagination<Lead[]>>(LEADS_URL, {
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
    fetchLeads();
  };

  const resetFilter = async () => {
    setQuery({
      search: "",
      date_start: "",
      date_end: "",
      status: "",
      branch: "",
      probability: "",
      type: "",
      channel: "",
      media: "",
      source: "",
      page: "",
    });
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

  const deleteLead = async (id: string) => {
    try {
      await $fetch(`${LEADS_URL}/${id}`, {
        method: "DELETE",
      });
      fetchLeads();
      toast.success("Lead deleted successfully");
    } catch (err) {
      toast.error("Something went wrong. Please try again later.");
      console.log(err);
    }
  };

  // fetch immediatly when query.page changes
  useEffect(() => {
    fetchLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.page]);

  return {
    data,
    loading,
    query,
    setQuery,
    filter,
    handlePagination,
    deleteLead,
    resetFilter,
    fetchLeads,
  };
}
