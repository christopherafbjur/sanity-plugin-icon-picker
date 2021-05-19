import React from "react";
import {
  Menu as SanityMenu,
  MenuButton,
  Button,
  MenuItem,
  MenuDivider,
} from "@sanity/ui";

const Menu = ({ onClick, selected }) => {
  return (
    <>
      {!selected && (
        <Button
          fontSize={[2, 2, 3]}
          mode="ghost"
          padding={[3, 3, 4]}
          tone="default"
          text={"Add"}
          onClick={() => onClick("add")}
        />
      )}
      {selected && (
        <MenuButton
          button={
            <Button
              fontSize={[2, 2, 3]}
              mode="ghost"
              padding={[3, 3, 4]}
              tone="default"
              text={<selected.component />}
            />
          }
          id="menu-button-example"
          menu={
            <SanityMenu>
              <MenuItem text="Edit" onClick={() => onClick("edit")} />
              <MenuItem text="Delete" onClick={() => onClick("delete")} />
            </SanityMenu>
          }
          placement="bottom"
        />
      )}
    </>
  );
};

export default Menu;
