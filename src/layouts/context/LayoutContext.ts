import { createContext } from "react";

interface Props {
  isShowSidebar: boolean;
  setIsShowSidebar: (isShowSidebar: boolean) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const LayoutContext = createContext<Props>({
  isShowSidebar: true,
  setIsShowSidebar: () => {}
});