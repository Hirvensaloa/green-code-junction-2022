import Image from "next/image";
import { FC } from "react";

interface EnergyIconProps {
  w?: number;
  h?: number;
}

export const EnergyIcon: FC<EnergyIconProps> = ({
  w = 16,
  h = 24,
  ...rest
}) => (
  <Image
    src="/energy.svg"
    alt="energy"
    width={`${w}`}
    height={`${h}`}
    {...rest}
  />
);
