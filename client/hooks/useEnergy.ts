import { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { remainingEnergyState } from '../recoil';
import { fetchEnergy } from '../utils/energy';

export const useEnergy = () => {
  const [remainingEnergy, setRemainingEnergy] =
    useRecoilState(remainingEnergyState);

  useEffect(() => {
    fetchEnergy().then((e) => setRemainingEnergy(e));
  }, [setRemainingEnergy]);

  const setEnergy = useCallback(
    (amount: number) => setRemainingEnergy(Math.max(amount, 0)),
    [setRemainingEnergy]
  );

  return {
    remainingEnergy,
    setEnergy,
  };
};
