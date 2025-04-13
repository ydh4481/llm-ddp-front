// src/modules/global/hooks/useGlobalUI.ts

'use client';

import { useContext } from 'react';
import { GlobalUIContext } from '../provider/GlobalUIProvider';

export const useGlobalUI = () => {
  const context = useContext(GlobalUIContext);
  if (!context) {
    throw new Error('useGlobalUI는 GlobalUIProvider 안에서만 사용할 수 있습니다.');
  }
  return context;
};
