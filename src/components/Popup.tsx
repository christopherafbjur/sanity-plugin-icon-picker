import { ReactNode } from 'react';
import { Dialog, Box } from '@sanity/ui';

interface IPopup {
  onClose: () => void;
  children: ReactNode;
  isOpen: boolean;
}

const Popup = ({ onClose, children, isOpen }: IPopup) => {
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
