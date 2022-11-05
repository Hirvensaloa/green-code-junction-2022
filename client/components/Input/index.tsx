import styled from "styled-components";
import { textBase } from "../../styles/typography";

export const Input = styled.input`
  ${textBase}
  all: unset;

  ::placeholder {
    ${textBase}
    opacity: 0.7;
  }
`;

export const MultilineInput = styled.textarea`
  ${textBase}
  all: unset;

  ::placeholder {
    ${textBase}
    opacity: 0.7;
  }
`;
