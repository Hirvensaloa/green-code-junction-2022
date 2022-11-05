import { useCallback } from "react";
import { useRecoilState } from "recoil";

import { ContentList } from "../views/ContentList";
import { activeContentState } from "../recoil";

export const DEFAULT_CONTENT = <ContentList />;

export const useActiveContent = () => {
  const [activeContent, setActiveContent] = useRecoilState(activeContentState);

  const setDefaultContent = useCallback(
    () => setActiveContent(DEFAULT_CONTENT),
    [setActiveContent]
  );

  return {
    activeContent,
    setActiveContent,
    setDefaultContent,
  };
};
