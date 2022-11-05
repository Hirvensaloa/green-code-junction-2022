import { useState } from "react";

export const useLike = () => {
  const [score, setScore] = useState(0);

  return { score, setScore };
};
