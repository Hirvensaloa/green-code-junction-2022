import { theme } from "../../styles/theme";
import styled from "styled-components";
import Image from "next/image";
import { FC } from "react";
import { useLike } from "../../hooks/useLike";

const Button = styled.button`
  all: unset;
`;

interface objectScore {
  score: number;
  setVote: () => void;
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
  const { score, setUpVote, setDownVote } = useLike();
  return (
    <ButtonHolderStyle>
      <UpVoteButton score={score} setVote={setUpVote} />
      <DownVoteButton score={score} setVote={setDownVote} />
    </ButtonHolderStyle>
  );
};

const UpVoteButton: FC<objectScore> = ({ score, setVote }) => {
  return (
    <StyledUpVote vote={score} onClick={() => setVote()}>
      <Image src="/upvote.svg" alt="upvote" width="32" height="32" />
    </StyledUpVote>
  );
};

const DownVoteButton: FC<objectScore> = ({ score, setVote }) => {
  return (
    <StyledDownVote vote={score} onClick={() => setVote()}>
      <Image src="/downvote.svg" alt="downvote" width="32" height="32" />
    </StyledDownVote>
  );
};
export { ButtonHolder, UpVoteButton, DownVoteButton, Button };
