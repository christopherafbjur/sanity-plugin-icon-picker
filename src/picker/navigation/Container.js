import React from "react";
import { Card, Inline } from "@sanity/ui";

const Navigation = ({ children }) => {
  return (
    <Card>
      <Inline space={[3, 3, 4]} style={{ margin: "10px 0px" }}>
        {children}
      </Inline>
    </Card>
  );
};

export default Navigation;
