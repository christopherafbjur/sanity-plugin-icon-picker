import {
  Box,
  Card,
  Container,
  Heading,
  Tab,
  TabList,
  TabPanel,
} from '@sanity/ui';
import React, { cloneElement, useState } from 'react';
import {
  ALL_CONFIGURATIONS_PROVIDER,
  ALL_CONFIGURATIONS_TITLE,
} from '../constants/config';
import { configurationFromProvider, getProviders } from '../utils/helpers';
import type { IconPickerOptions } from '../types';
import type { ReactElement } from 'react';

interface ITabs {
  children: ReactElement;
  options: IconPickerOptions;
  onClick: () => void;
}

const configurationTitleFromProvider = (
  provider: string,
  options: IconPickerOptions
) => {
  if (provider === ALL_CONFIGURATIONS_PROVIDER) return ALL_CONFIGURATIONS_TITLE;
  return configurationFromProvider(provider, options).title;
};

const Tabs = ({ children, options, onClick }: ITabs) => {
  const [id, setId] = useState(ALL_CONFIGURATIONS_PROVIDER);
  const allProviders = getProviders(options);

  const handleClick = (itemId: string) => {
    setId(itemId);
    onClick();
  };

  const generateTabList = (providers: string[]) => {
    return (
      <TabList space={1}>
        {[ALL_CONFIGURATIONS_PROVIDER, ...providers].map((provider) => {
          const title = configurationTitleFromProvider(provider, options);

          return (
            <Tab
              key={provider}
              aria-controls={`${provider}-panel`}
              id={`${provider}-tab`}
              label={`${title}`}
              onClick={() => handleClick(provider)}
              selected={id === provider}
            />
          );
        })}
      </TabList>
    );
  };
  const generateTabPanels = (providers: string[]) => {
    return (
      <React.Fragment>
        {[ALL_CONFIGURATIONS_PROVIDER, ...providers].map((provider) => {
          const filter =
            provider === ALL_CONFIGURATIONS_PROVIDER ? null : provider;

          const title = configurationTitleFromProvider(provider, options);
          return (
            <TabPanel
              key={provider}
              aria-labelledby={`${provider}-tab`}
              hidden={id !== provider}
              id={`${provider}-panel`}
            >
              <Card marginTop={2} padding={4} radius={2}>
                <Heading>{title}</Heading>
                <Box marginTop={4}>{cloneElement(children, { filter })}</Box>
              </Card>
            </TabPanel>
          );
        })}
      </React.Fragment>
    );
  };
  const generateContent = (providers: string[]) => {
    return (
      <React.Fragment>
        {generateTabList(providers)}
        {generateTabPanels(providers)}
      </React.Fragment>
    );
  };
  return (
    <Container>
      <Box marginTop={4}>{generateContent(allProviders)}</Box>
    </Container>
  );
};

export default Tabs;
