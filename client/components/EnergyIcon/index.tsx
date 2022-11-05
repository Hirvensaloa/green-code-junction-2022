import Image from "next/image";
import { FC } from "react";

interface EnergyIconProps {
  w?: number;
  h?: number;
  type?: "flat" | "black";
}

export const EnergyIcon: FC<EnergyIconProps> = ({
  w = 16,
  h = 24,
  type,
  ...rest
}) => {
  const imageSpecifier = type ? `_${type}` : "";
  return (
    <Image
      src={`/energy${imageSpecifier}.svg`}
      alt={`energy${imageSpecifier}`}
      width={`${w}`}
      height={`${h}`}
      {...rest}
    />
  );
};
