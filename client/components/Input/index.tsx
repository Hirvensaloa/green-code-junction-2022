import styled from "styled-components";
import { textBase } from "../../styles/typography";

export const Input = styled.input`
  ${textBase}

  ::placeholder {
    ${textBase}
    opacity: 0.7;
  }
`;

export const MultilineInput = styled.textarea`
  ${textBase}

  ::placeholder {
    ${textBase}
    opacity: 0.7;
  }
`;
