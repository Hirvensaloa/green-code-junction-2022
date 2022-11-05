import styled from "styled-components";
import Image from "next/image";

const StyledUpVote = styled.button`
  all: unset;
  cursor: pointer;
`;

const StyledDownVote = styled.button``;

const UpVoteButton = () => {
  return (
    <StyledUpVote>
      <Image src="/upvote.svg" alt="upvote" width="16" height="16" />
    </StyledUpVote>
  );
};

const DownVoteButton = () => {
  return (
    <StyledDownVote>
      <Image src="/downvote.svg" alt="downvote" width="16" height="16" />
    </StyledDownVote>
  );
};
export { UpVoteButton, DownVoteButton };
