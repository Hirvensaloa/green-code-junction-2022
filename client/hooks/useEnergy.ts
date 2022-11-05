import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { remainingEnergyState } from "../recoil";

export const useEnergy = () => {
  const [remainingEnergy, setRemainingEnergy] =
    useRecoilState(remainingEnergyState);

  const decreaseEnergy = useCallback(
    (amount: number) => setRemainingEnergy(remainingEnergy - amount),
    [remainingEnergy, setRemainingEnergy]
  );

  return {
    remainingEnergy,
    decreaseEnergy,
  };
};
