import { ReactNode } from 'react';
import { atom } from 'recoil';

import { ContentList } from './views/ContentList';

export const activeContentState = atom<ReactNode>({
  key: 'activeContentState',
  default: <ContentList />,
});

export const remainingEnergyState = atom({
  key: 'remainingEnergyState',
  default: 0,
});

export const displayNoEnergyState = atom({
  key: 'displayNoEnergyState',
  default: false,
});
