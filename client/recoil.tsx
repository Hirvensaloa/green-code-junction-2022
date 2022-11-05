import { ReactNode } from "react";
import { atom } from "recoil";

import { ContentList } from "./views/ContentList";

export const activeContentState = atom<ReactNode>({
  key: "activeContentState",
  default: <ContentList />,
});
