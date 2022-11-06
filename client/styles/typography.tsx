import styled, { css } from "styled-components";
import { theme } from "./theme";

export const headingBase = css<{ $dark?: boolean }>`
  color: ${(p) =>
    p.$dark ? theme.background.primary : theme.foreground.primary};
  font-family: "Lato", sans-serif;
`;

export const textBase = css<{ $dark?: boolean }>`
  color: ${(p) =>
    p.$dark ? theme.background.primary : theme.foreground.primary};
  font-family: "Arial", sans-serif;
`;

export const Text = styled.p`
  ${textBase}
  font-size: 1rem;
  line-height: 1.25rem;
`;

export const TextStrong = styled(Text)`
  font-weight: bold;
`;

export const SmallText = styled.p`
  ${textBase}
  font-size: 0.75rem;
  line-height: 0.75rem;
`;

export const ButtonText = styled(Text)`
  ${headingBase}
  font-family: "Lilita One", sans-serif;
`;

export const Heading1 = styled.h1`
  ${headingBase}
  font-size: 3rem;
  line-height: 4rem;
`;

export const Heading2 = styled.h2`
  ${headingBase}
  font-size: 2rem;
  line-height: 3rem;
`;

export const Heading3 = styled.h3`
  ${headingBase}
  font-size: 1.5rem;
  line-height: 2.25rem;
`;

export const Heading4 = styled.h4`
  ${headingBase}
  font-size: 1.25rem;
  line-height: 1.75rem;
`;
