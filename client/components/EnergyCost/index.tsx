import Image from "next/image";
import { FC } from "react";
import styled from "styled-components";

import { theme } from "../../styles/theme";

export interface EnergyCostProps {
  cost?: number | "x";
}

const Wrapper = styled.div`
  position: absolute;
`;

const CostValue = styled.span`
  position: absolute;
  top: 50%;
  right: 1.5rem;
  transform: translate3d(0, -50%, 0);
  text-align: right;
  color: ${theme.foreground.primary};
  text-shadow: 0px 0px 1px ${theme.background.primary};
`;

const getDisplayValue = (cost: EnergyCostProps["cost"]) => {
  if (cost === undefined) {
    return null;
  }
  return `${cost}`;
};

export const EnergyCost: FC<EnergyCostProps> = ({ cost, ...rest }) => (
  <Wrapper {...rest}>
    <Image src="/energy.svg" alt="energy" width="16" height="26" />
    <CostValue>{getDisplayValue(cost)}</CostValue>
  </Wrapper>
);
