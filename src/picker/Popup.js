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
      width={1}
    >
      <Box padding={4}>{children}</Box>
    </Dialog>
  );
};

export default Popup;
