import React from "react";
import { Option } from "../../../../config/types";

interface Props {
  types?: Option[];
  channels?: Option[];
  media?: Option[];
  sources?: Option[];
  probabilities?: Option[];
  statuses?: Option[];
  fetchOptions?: () => Promise<void>;
}

export const SettingContext = React.createContext<Props>({});