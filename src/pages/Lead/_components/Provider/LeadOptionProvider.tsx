import React from "react";
import useLeadOptionFilter from "../../_hooks/useLeadOptionFilter";
import { LeadOptionContext } from "../../_hooks/context/LeadOptionContext";

export default function LeadOptionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    branch,
    types,
    channels,
    media,
    probabilities,
    sources,
    statuses,
    users,
    fetchOptions,
  } = useLeadOptionFilter();
  return (
    <LeadOptionContext.Provider
      value={{
        branch,
        types,
        channels,
        media,
        sources,
        probabilities,
        statuses,
        users,
        fetchOptions,
      }}
    >
      {children}
    </LeadOptionContext.Provider>
  );
}
