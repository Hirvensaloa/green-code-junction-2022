import { ReactNode } from 'react';
import { atom } from 'recoil';

import { ContentList } from './views/ContentList';
import { MAX_ENERGY_AMOUNT } from './constants/energy';

export const activeContentState = atom<ReactNode>({
  key: 'activeContentState',
  default: <ContentList />,
});

export const remainingEnergyState = atom({
  key: 'remainingEnergyState',
  default: 0,
});
