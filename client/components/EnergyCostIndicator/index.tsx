import Image from "next/image";
import { FC } from "react";
import styled from "styled-components";

export interface EnergyCostProps {
  amount: 1 | 2 | 3 | 4;
}

const Wrapper = styled.div<{ $amount: number }>`
  position: relative;
  transform: translate3d(-${(p) => (p.$amount - 1) * 0.25}rem, 0, 0);
`;

const Icon = styled.div<{ $index: number }>`
  position: absolute;
  z-index: 12;
  right: ${(p) => p.$index * -0.5}rem;
`;

export const EnergyCostIndicator: FC<EnergyCostProps> = ({
  amount,
  ...rest
}) => (
  <Wrapper $amount={amount} {...rest}>
    {Array(amount)
      .fill(0)
      .map((_, i) => (
        <Icon key={i} $index={i}>
          <Image src="/energy.svg" alt="energy" width="16" height="26" />
        </Icon>
      ))}
  </Wrapper>
);
