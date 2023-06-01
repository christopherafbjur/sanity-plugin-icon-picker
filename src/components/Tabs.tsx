import React, { useState, ReactElement } from "react";
import {
  Container,
  TabList,
  TabPanel,
  Tab,
  Heading,
  Card,
  Box,
} from "@sanity/ui";
import { getProviderPrefixes, providerConfigurationFromPrefix } from "../utils/helpers";
import { IconPickerOptions } from "../types";
import { ALL_PROVIDERS_PREFIX, ALL_PROVIDERS_TITLE } from "../constants/config";

interface ITabs {
  children: ReactElement;
  options: IconPickerOptions;
  onClick: () => void;
}

const providerTitleFromPrefix = (prefix: string, options: IconPickerOptions) => {
  if (prefix === ALL_PROVIDERS_PREFIX) return ALL_PROVIDERS_TITLE;
  return providerConfigurationFromPrefix(prefix, options).title;
};

const Tabs = ({ children, options, onClick }: ITabs) => {
  providerConfigurationFromPrefix;
  const [id, setId] = useState(ALL_PROVIDERS_PREFIX);
  const providerPrefixes = getProviderPrefixes(options);

  const handleClick = (itemId: string) => {
    setId(itemId);
    onClick();
  };

  const generateTabList = (prefixes: string[]) => {
    return (
      <TabList space={1}>
        {prefixes.map((prefix) => {
          const title = providerTitleFromPrefix(prefix, options);

          return (
            <Tab
              key={prefix}
              aria-controls={`${prefix}-panel`}
              id={`${prefix}-tab`}
              label={`${title}`}
              onClick={() => handleClick(prefix)}
              selected={id === prefix}
            />
          );
        })}
      </TabList>
    );
  };
  const generateTabPanels = (prefixes: string[]) => {
    return (
      <React.Fragment>
        {prefixes.map((prefix) => {
          const filter = prefix === ALL_PROVIDERS_PREFIX ? null : prefix;

          const title = providerTitleFromPrefix(prefix, options);
          return (
            <TabPanel
              key={prefix}
              aria-labelledby={`${prefix}-tab`}
              hidden={id !== prefix}
              id={`${prefix}-panel`}
            >
              <Card marginTop={2} padding={4} radius={2}>
                <Heading>{title}</Heading>
                <Box marginTop={4}>
                  {React.cloneElement(children, { filter: filter })}
                </Box>
              </Card>
            </TabPanel>
          );
        })}
      </React.Fragment>
    );
  };
  const generateContent = (providerPrefixes: string[]) => {
    let prefixes = providerPrefixes;

    if (prefixes.length === 2) {
      prefixes = [...providerPrefixes.slice(1)];

      if (id === ALL_PROVIDERS_PREFIX) {
        setId(prefixes[0]);
      }
    }

    return (
      <React.Fragment>
        {generateTabList(prefixes)}
        {generateTabPanels(prefixes)}
      </React.Fragment>
    );
  };
  return (
    <Container>
      <Box marginTop={4}>{generateContent(providerPrefixes)}</Box>
    </Container>
  );
};

export default Tabs;
