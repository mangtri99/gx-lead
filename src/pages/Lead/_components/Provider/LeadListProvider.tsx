import React from "react";
import useListState from "../../../../composables/useListState";
import { Lead } from "../../../../config/types";
import { LeadListContext } from "../../_hooks/context/LeadListContext";
import { LEADS_URL } from "../../../../config/api";

export default function LeadListProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryParams = {
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
  };
  const {
    data,
    destroy,
    handlePagination,
    loading,
    query,
    setQuery,
    filter,
    resetFilter,
    fetchData,
  } = useListState<Lead, typeof queryParams>({
    queryParams,
    url: LEADS_URL,
  });
  return (
    <LeadListContext.Provider
      value={{
        data,
        destroy,
        handlePagination,
        loading,
        query,
        setQuery,
        filter,
        resetFilter,
        fetchData,
      }}
    >
      {children}
    </LeadListContext.Provider>
  );
}
