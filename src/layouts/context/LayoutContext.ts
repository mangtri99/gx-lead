import { createContext } from "react";

interface Props {
  isShowSidebar: boolean;
  setIsShowSidebar: (isShowSidebar: boolean) => void;
  setMarginContent: () => string;
}

export const LayoutContext = createContext<Props>({
  isShowSidebar: true,
  setIsShowSidebar: () => {},
  setMarginContent: () => '0px'
});