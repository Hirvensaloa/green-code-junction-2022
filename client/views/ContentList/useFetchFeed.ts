import { useEffect, useState } from "react";

import { HiddenContent } from "../../types";

export const useFetchFeed = () => {
  const [feed, setFeed] = useState<HiddenContent[] | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    !loading &&
      fetch("http://localhost:7777/api/posts")
        .then((res) => res.json())
        .then((data: HiddenContent[]) => {
          setLoading(false);
          setFeed(data || []);
        });
  }, [loading]);

  return {
    feed,
    loading,
  };
};
