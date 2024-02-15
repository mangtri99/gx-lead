import React from "react";
import { SelectOptions } from "../../../../config/types";

type SelectMediaOptions = SelectOptions & { channel_id: number };
type SelectSourceOptions = SelectOptions & { media_id: number };

interface Props {
  branch?: SelectOptions[];
  statuses?: SelectOptions[];
  probabilities?: SelectOptions[];
  types?: SelectOptions[];
  channels?: SelectOptions[];
  media?: SelectMediaOptions[];
  sources?: SelectSourceOptions[];
  fetchOptions?: () => Promise<void>;
}

export const LeadOptionContext = React.createContext<Props>({});