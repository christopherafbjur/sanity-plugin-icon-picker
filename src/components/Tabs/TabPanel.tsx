import { Box, Card, Heading, TabPanel as SanityTabPanel } from '@sanity/ui';
import { useOptions } from '../../hooks/useOptions';
import { configurationTitleFromProvider } from '../../utils/helpers';
import { useTabs } from './useTabs';
import type { ReactElement } from 'react';

interface TabPanelProps {
  provider: string;
  children: ReactElement;
}
export const TabPanel = ({ provider, children }: TabPanelProps) => {
  const options = useOptions();
  const { selectedTabId } = useTabs();
  const title = configurationTitleFromProvider(provider, options);

  return (
    <SanityTabPanel
      key={provider}
      aria-labelledby={`${provider}-tab`}
      hidden={selectedTabId !== provider}
      id={`${provider}-panel`}
    >
      <Card marginTop={2} padding={4} radius={2}>
        <Heading>{title}</Heading>
        <Box marginTop={4}>{children}</Box>
      </Card>
    </SanityTabPanel>
  );
};
