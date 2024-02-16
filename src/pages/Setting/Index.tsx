import { Helmet } from "react-helmet-async";
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
    <SettingContext.Provider value={{ types, channels, media, sources, probabilities, statuses, fetchOptions }}>
      <Helmet>
        <title>Lead Setting</title>
        <meta name="description" content="All lead settings" />
      </Helmet>
      <Home />
    </SettingContext.Provider>
  );
}
