import { theme } from "../../styles/theme";
import styled from "styled-components";
import Image from "next/image";
import { FC, useState } from "react";

const Button = styled.button`
  all: unset;
`;

interface objectScore {
  score: number;
  setVote: (score: number) => void;
}

const ButtonHolderStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  width: 10%;
`;

const StyledUpVote = styled(Button)<{ vote: number }>`
  position: relative;
  ${(p) => p.vote > 0 && `filter: invert(1);`}
`;

const StyledDownVote = styled(Button)<{ vote: number }>`
  position: relative;
  ${(p) => p.vote < 0 && `filter: invert(1);`}
`;

const ButtonHolder = () => {
  const [score, setScore] = useState(0);
  return (
    <ButtonHolderStyle>
      <UpVoteButton score={score} setVote={setScore} />
      <DownVoteButton score={score} setVote={setScore} />
    </ButtonHolderStyle>
  );
};

const UpVoteButton: FC<objectScore> = ({ score, setVote }) => {
  return (
    <StyledUpVote
      vote={score}
      onClick={() => (score < 1 ? setVote(1) : setVote(0))}
    >
      <Image src="/upvote.svg" alt="upvote" width="32" height="32" />
    </StyledUpVote>
  );
};

const DownVoteButton: FC<objectScore> = ({ score, setVote }) => {
  return (
    <StyledDownVote
      vote={score}
      onClick={() => (score > -1 ? setVote(-1) : setVote(0))}
    >
      <Image src="/downvote.svg" alt="downvote" width="32" height="32" />
    </StyledDownVote>
  );
};
export { ButtonHolder, UpVoteButton, DownVoteButton, Button };
