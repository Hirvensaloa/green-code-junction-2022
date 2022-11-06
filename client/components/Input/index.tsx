import styled from "styled-components";
import { textBase } from "../../styles/typography";

export const Input = styled.input`
  all: unset;
  ${textBase}

  ::placeholder {
    ${textBase}
    opacity: 0.7;
  }
`;

export const TitleInput = styled(Input)`
  font-family: "Lato";
  font-size: 1.25rem;
  width: 100%;
  padding: 0.5rem 0;
  ::placeholder {
    font-family: "Lato";
    opacity: 0.7;
  }
`;

export const MultilineInput = styled.textarea`
  all: unset;
  ${textBase}

  ::placeholder {
    ${textBase}
    opacity: 0.7;
  }
`;
