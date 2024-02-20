import HeadWrapper from "../../components/General/HeadWrapper";
import Home from "./_components/Home";
import { SettingContext } from "./_hooks/context/SettingContext";
import useSettingState from "./_hooks/useSettingState";

export default function Index() {
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
    <HeadWrapper title="Lead Setting" description="All lead settings">
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
        <Home />
      </SettingContext.Provider>
    </HeadWrapper>
  );
}
