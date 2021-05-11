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
import { getSelectedProviders } from "../utils/helpers";

const Tabs = ({ children, options }) => {
  const [id, setId] = useState(PROVIDERS.default.prefix);
  const selectedProviders = getSelectedProviders(options);

  const handleClick = (id) => {
    setId(id);
  };

  const generateContent = (providers) => {
    if (providers.length < 2)
      return React.cloneElement(children, { filter: null });

    return (
      <React.Fragment>
        {generateTabList(providers)}
        {generateTabPanels(providers)}
      </React.Fragment>
    );
  };
  const generateTabList = (providers) => {
    return (
      <TabList space={1}>
        {providers.map((provider) => (
          <Tab
            key={provider}
            aria-controls={`${provider}-panel`}
            /* icon={EditIcon} */
            id={`${provider}-tab`}
            label={`${provider}`}
            onClick={() => handleClick(provider)}
            selected={id === provider}
            space={2}
          />
        ))}
      </TabList>
    );
  };
  const generateTabPanels = (providers) => {
    return (
      <React.Fragment>
        {providers.map((provider) => {
          const filter =
            provider !== PROVIDERS.default.prefix ? provider : null;
          return (
            <TabPanel
              key={provider}
              aria-labelledby={`${provider}-tab`}
              hidden={id !== provider}
              id={`${provider}-panel`}
            >
              <Card marginTop={2} padding={4} radius={2}>
                <Heading>{provider}</Heading>
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
