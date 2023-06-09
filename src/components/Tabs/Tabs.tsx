import { Box, Container } from '@sanity/ui';
import { TabsProvider } from './useTabs';
import type { ReactElement } from 'react';

export const Tabs = ({ children }: { children: ReactElement[] }) => {
  return (
    <TabsProvider>
      <Container>
        <Box marginTop={4}>{children}</Box>
      </Container>
    </TabsProvider>
  );
};
