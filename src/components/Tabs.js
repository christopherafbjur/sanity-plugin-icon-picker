import React, { useState } from "react";
import { PROVIDERS } from "../config";
import {
  Container,
  TabList,
  TabPanel,
  Tab,
  Heading,
  Card,
  Box,
} from "@sanity/ui";
import { getSelectedProviders, providerFromPrefix } from "../utils/helpers";

const Tabs = ({ children, options, onClick }) => {
  const [id, setId] = useState(PROVIDERS.default.prefix);
  const selectedProviders = getSelectedProviders(options);

  const handleClick = (id) => {
    setId(id);
    onClick();
  };

  const generateContent = (providers) => {
    if (providers.length === 2) {
      providers = [...providers.slice(1)];

      if (id === PROVIDERS.default.prefix) {
        setId(providers[0]);
      }
    }

    return (
      <React.Fragment>
        {generateTabList(providers)}
        {generateTabPanels(providers)}
      </React.Fragment>
    );
  };
  const generateTabList = (prefixes) => {
    return (
      <TabList space={1}>
        {prefixes.map((prefix) => {
          const { title } = providerFromPrefix(prefix);
          return (
            <Tab
              key={prefix}
              aria-controls={`${prefix}-panel`}
              /* icon={EditIcon} */
              id={`${prefix}-tab`}
              label={`${title}`}
              onClick={() => handleClick(prefix)}
              selected={id === prefix}
              space={2}
            />
          );
        })}
      </TabList>
    );
  };
  const generateTabPanels = (prefixes) => {
    return (
      <React.Fragment>
        {prefixes.map((prefix) => {
          const filter = prefix !== PROVIDERS.default.prefix ? prefix : null;
          const { title } = providerFromPrefix(prefix);
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
  return (
    <Container>
      <Box marginTop={4}>{generateContent(selectedProviders)}</Box>
    </Container>
  );
};

export default Tabs;
