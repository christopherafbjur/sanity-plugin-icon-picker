import React, { useState } from "react";
import {
  Container,
  TabList,
  TabPanel,
  Tab,
  Heading,
  Card,
  Box,
} from "@sanity/ui";

const Tabs = ({ children, options = {} }) => {
  const DEFAULT_LIB = "all-icons";
  const [id, setId] = useState("all-icons");
  const selectedLibs = options.libs
    ? [DEFAULT_LIB, ...options.libs]
    : [DEFAULT_LIB];

  const handleClick = (id) => {
    setId(id);
  };

  const generateContent = (libs) => {
    if (libs.length < 2) return React.cloneElement(children, { filter: null });

    return (
      <React.Fragment>
        {generateTabList(libs)}
        {generateTabPanels(libs)}
      </React.Fragment>
    );
  };
  const generateTabList = (libs) => {
    return (
      <TabList space={1}>
        {libs.map((lib) => (
          <Tab
            aria-controls={`${lib}-panel`}
            /* icon={EditIcon} */
            id={`${lib}-tab`}
            label={`${lib}`}
            onClick={() => handleClick(lib)}
            selected={id === lib}
            space={2}
          />
        ))}
      </TabList>
    );
  };
  const generateTabPanels = (libs) => {
    /* return (
      <React.Fragment>
        <TabPanel
          aria-labelledby="all-icons-tab"
          hidden={id !== "all-icons"}
          id="all-icons-panel"
        >
          <Card marginTop={2} padding={4} radius={2}>
            <Heading>All Icons</Heading>
            {React.cloneElement(children, { filter: null })}
          </Card>
        </TabPanel>
      </React.Fragment>
    ); */
    return (
      <React.Fragment>
        {libs.map((lib) => {
          const filter = lib !== DEFAULT_LIB ? lib : null;
          return (
            <TabPanel
              aria-labelledby={`${lib}-tab`}
              hidden={id !== lib}
              id={`${lib}-panel`}
            >
              <Card marginTop={2} padding={4} radius={2}>
                <Heading>{lib}</Heading>
                {React.cloneElement(children, { filter: filter })}
              </Card>
            </TabPanel>
          );
        })}
      </React.Fragment>
    );
  };
  return <Container>{generateContent(selectedLibs)}</Container>;
  return (
    <Container height="stretch">
      <Box marginTop={4}>
        <TabList space={1}>
          <Tab
            aria-controls="all-icons-panel"
            /* icon={EditIcon} */
            id="all-icons-tab"
            label="All Icons"
            onClick={() => handleClick("all-icons")}
            selected={id === "all-icons"}
            space={2}
          />
          <Tab
            aria-controls="framework7-icons-panel"
            /* icon={id === "preview" ? EyeOpenIcon : EyeClosedIcon} */
            id="framework7-icons-tab"
            label="Framework7 Icons"
            onClick={() => handleClick("framework7-icons")}
            selected={id === "framework7-icons"}
            space={2}
          />
          <Tab
            aria-controls="font-awesome-panel"
            /* icon={id === "preview" ? EyeOpenIcon : EyeClosedIcon} */
            id="font-awesome-tab"
            label="Font Awesome"
            onClick={() => handleClick("font-awesome")}
            selected={id === "font-awesome"}
            space={2}
          />
        </TabList>

        <TabPanel
          aria-labelledby="all-icons-tab"
          hidden={id !== "all-icons"}
          id="all-icons-panel"
        >
          <Card marginTop={2} padding={4} radius={2}>
            <Heading>All Icons</Heading>
            {React.cloneElement(props.children, { filter: null })}
          </Card>
        </TabPanel>

        <TabPanel
          aria-labelledby="framework7-icons-tab"
          hidden={id !== "framework7-icons"}
          id="framework7-icons-panel"
        >
          <Card marginTop={2} padding={4}>
            <Heading>Framework7 Icons</Heading>
            {React.cloneElement(props.children, { filter: id })}
          </Card>
        </TabPanel>

        <TabPanel
          aria-labelledby="font-awesome-tab"
          hidden={id !== "font-awesome"}
          id="font-awesome-panel"
        >
          <Card marginTop={2} padding={4} radius={2}>
            <Heading>Font Awesome</Heading>
            {React.cloneElement(props.children, { filter: id })}
          </Card>
        </TabPanel>
      </Box>
    </Container>
  );
};

export default Tabs;
