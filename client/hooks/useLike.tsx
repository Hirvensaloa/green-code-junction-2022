import { useState } from "react";

export const useLike = () => {
  const [score, setScore] = useState(0);

  const setDownVote = () => {
    if (score > -1) {
      setScore(-1);
      like();
    } else {
      setScore(0);
    }
  };
  const setUpVote = () => {
    if (score < 1) {
      setScore(1);
      like();
    } else {
      setScore(0);
    }
  };

  const like = async () => {
    const response = await fetch("http://localhost:7777/api/like", {
      method: "POST",
      body: JSON.stringify({ like: score === 1 }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return { score, setUpVote, setDownVote };
};
