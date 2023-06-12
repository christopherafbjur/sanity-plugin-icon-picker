import React, { createContext, useContext, useState } from 'react';
import { ALL_CONFIGURATIONS_PROVIDER } from '../../constants/config';
import type { ReactElement } from 'react';

interface ITabsContext {
  selectedTabId: string;
  setSelectedTabId: React.Dispatch<React.SetStateAction<string>>;
}

const TabsContext = createContext<ITabsContext | undefined>(undefined);

export const TabsProvider = ({ children }: { children: ReactElement }) => {
  const [selectedTabId, setSelectedTabId] = useState<string>(
    ALL_CONFIGURATIONS_PROVIDER
  );

  return (
    <TabsContext.Provider value={{ selectedTabId, setSelectedTabId }}>
      {children}
    </TabsContext.Provider>
  );
};

export const useTabs = (): ITabsContext => {
  const context = useContext(TabsContext);
  if (context === undefined) {
    throw new Error('useTabs must be used within a TabsProvider');
  }
  return context;
};
