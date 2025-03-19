import { Box, Container } from '@sanity/ui';
import { TabsProvider } from './useTabs';
import type { ReactNode } from 'react';

export const Tabs = ({ children }: { children: ReactNode }) => {
  return (
    <TabsProvider>
      <Container>
        <Box marginTop={4}>{children}</Box>
      </Container>
    </TabsProvider>
  );
};
