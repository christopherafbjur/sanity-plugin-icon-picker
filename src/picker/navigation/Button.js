import React from "react";
import { Button } from "@sanity/ui";

const NavButton = ({ selected, onClick }) => {
  return (
    <React.Fragment>
      {!selected && (
        <Button
          fontSize={[2, 2, 3]}
          /* icon={AddIcon} */
          mode="ghost"
          padding={[3, 3, 4]}
          tone="brand"
          text="Add an icon"
          /* onClick={onOpen} */
          /* onClick={() => onButtonClick(true)} */
          onClick={() => onClick(true)}
        />
      )}
      {selected && (
        <Button
          fontSize={[2, 2, 3]}
          /* icon={AddIcon} */
          mode="ghost"
          padding={[3, 3, 4]}
          text="Remove icon"
          tone="critical"
          /* onClick={unsetIcon} */
          /* onClick={() => onButtonClick(false)} */
          onClick={() => onClick(false)}
        />
      )}
    </React.Fragment>
  );
};

export default NavButton;
