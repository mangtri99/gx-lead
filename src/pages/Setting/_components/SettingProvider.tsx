import React from "react";
import useSettingState from "../_hooks/useSettingState";
import { SettingContext } from "../_hooks/context/SettingContext";

export default function SettingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    types,
    channels,
    media,
    probabilities,
    sources,
    statuses,
    fetchOptions,
  } = useSettingState();
  return (
    <SettingContext.Provider
      value={{
        types,
        channels,
        media,
        sources,
        probabilities,
        statuses,
        fetchOptions,
      }}
    >
      {children}
    </SettingContext.Provider>
  );
}
