import React, { createContext, useContext, useState } from 'react';
import type { IconPickerOptions } from '../types';
import type { ReactNode } from 'react';

const OptionsContext = createContext<IconPickerOptions | undefined>(undefined);

interface OptionsProviderProps {
  options: IconPickerOptions;
  children: ReactNode;
}

export const OptionsProvider = ({
  options,
  children,
}: OptionsProviderProps) => {
  const [value] = useState<IconPickerOptions>(options);

  return (
    <OptionsContext.Provider value={value}>{children}</OptionsContext.Provider>
  );
};

export const useOptions = (): IconPickerOptions => {
  const context = useContext(OptionsContext);
  if (context === undefined) {
    throw new Error('useOptions must be used within a OptionsProvider');
  }
  return context;
};
