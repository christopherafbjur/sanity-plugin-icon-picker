import React from "react";
import {
  Menu as SanityMenu,
  MenuButton,
  Button,
  MenuItem,
  MenuDivider,
} from "@sanity/ui";
import { AddIcon } from "@sanity/icons";

const Menu = ({ onClick, selected }) => {
  return (
    <>
      {!selected && (
        <Button
          icon={AddIcon}
          fontSize={[1, 1, 2]}
          mode="ghost"
          padding={[2, 2, 3]}
          tone="default"
          text={"Add icon"}
          onClick={() => onClick("add")}
        />
      )}
      {selected && (
        <MenuButton
          button={
            <Button
              mode="ghost"
              padding={[2, 2, 3]}
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
