import React from "react";
import { APIResponsePagination, Lead } from "../../../../config/types";

interface Props<T> {
  data?: APIResponsePagination<Lead[]>;
  destroy?: (id: string) => Promise<void>
  handlePagination?: (page: string) => void
  loading?: boolean
  query?: T
  setQuery?: React.Dispatch<React.SetStateAction<T>>
  filter?: () => Promise<void>
  resetFilter?: () => Promise<void>
  fetchData?: () => Promise<void>
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const LeadListContext = React.createContext<Props<T>>({});