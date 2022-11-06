import styled from 'styled-components';

import { EnergyIcon } from '../EnergyIcon';
import { MAX_ENERGY_AMOUNT } from '../../constants/energy';
import { useEnergy } from '../../hooks/useEnergy';

import { theme } from '../../styles/theme';

const EnergyBarContainer = styled.div`
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  padding: 2rem 1rem 1.5rem 1.25rem;
  background-color: ${theme.background.primary};
`;

const StyledEnergyBar = styled.div<{ noEnergy: boolean }>`
  position: relative;
  padding: 0.5rem;
  border-radius: 1rem;
  background-color: ${theme.background.secondary};

  ${(p) => p.noEnergy && 'outline: 2px solid red'};
`;

const Icon = styled(EnergyIcon)`
  position: absolute;
  z-index: 10;
  left: -0.25rem;
  top: -0.25rem;
`;

const FilledEnergy = styled.div<{ fillPercentage: number }>`
  width: ${(p) => p.fillPercentage}%;
  height: 1.5rem;
  box-shadow: 0px 0px 4px ${theme.foreground.primary};
  border-radius: 1rem;
  background-color: ${theme.accent.energyYellow};
  transition: width 200ms ease-in-out;
`;

export const EnergyBar = () => {
  const { remainingEnergy, displayNoEnergy, setDisplayNoEnergy } = useEnergy();
  const fillPercentage = Math.round(
    (remainingEnergy / MAX_ENERGY_AMOUNT) * 100
  );
  if (displayNoEnergy) {
    setTimeout(() => {
      setDisplayNoEnergy(false);
    }, 5000);
  }

  return (
    <EnergyBarContainer>
      <StyledEnergyBar noEnergy={displayNoEnergy}>
        <Icon w={32} h={48} type={fillPercentage === 0 ? 'black' : undefined} />
        <FilledEnergy fillPercentage={fillPercentage} />
      </StyledEnergyBar>
    </EnergyBarContainer>
  );
};
