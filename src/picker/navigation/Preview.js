import React from "react";
import { Button } from "@sanity/ui";

const Preview = ({ onClick, selected, renderIcon }) => {
  return (
    <>
      {selected && (
        <Button
          fontSize={[2, 2, 3]}
          mode="ghost"
          padding={[3, 3, 4]}
          tone="default"
          text={<selected.component />}
          onClick={onClick}
        />
      )}
    </>
  );
};

export default Preview;
