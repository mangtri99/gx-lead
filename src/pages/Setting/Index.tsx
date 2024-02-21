import HeadWrapper from "../../components/General/HeadWrapper";
import Home from "./_components/Home";
import SettingProvider from "./_components/SettingProvider";

export default function Index() {
  return (
    <HeadWrapper title="Lead Setting" description="All lead settings">
      <SettingProvider>
        <Home />
      </SettingProvider>
    </HeadWrapper>
  );
}
