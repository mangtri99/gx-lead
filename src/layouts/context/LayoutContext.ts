import { createContext } from "react";

interface Props {
  isShowSidebar: boolean;
  setIsShowSidebar: (isShowSidebar: boolean) => void;
  setMarginContent: () => string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const LayoutContext = createContext<Props>({
  isShowSidebar: true,
  setIsShowSidebar: () => {},
  setMarginContent: () => '0px'
});