import React from "react";
import { Card, Dialog, Box } from "@sanity/ui";

const Popup = ({ onClose, children, isOpen }) => {
  if (!isOpen) return null;
  return (
    <Dialog
      header="Icon Picker"
      id="icon-popup"
      onClose={onClose}
      zOffset={1000}
      width={100}
    >
      <Box padding={4}>
        <Card padding={[3, 3, 4]} paddingBottom={[8, 8, 9]}>
          {children}
        </Card>
      </Box>
    </Dialog>
  );
};

export default Popup;
