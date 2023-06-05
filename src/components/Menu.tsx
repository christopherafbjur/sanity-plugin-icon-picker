import { AddIcon } from '@sanity/icons';
import { Button, MenuButton, MenuItem, Menu as SanityMenu } from '@sanity/ui';
import type { IconObject } from '../types';

// eslint-disable-next-line no-shadow
export enum Action {
  add = 'add',
  edit = 'edit',
  delete = 'delete',
}

export type MenuClickCallback = (action: Action) => void | Error;

const Menu = ({
  onClick,
  selected,
}: {
  onClick: MenuClickCallback;
  selected: IconObject | null;
}) => {
  return (
    <>
      {!selected && (
        <Button
          icon={AddIcon}
          fontSize={[1, 1, 2]}
          mode="ghost"
          padding={[2, 2, 3]}
          tone="default"
          text={'Add icon'}
          onClick={() => onClick(Action.add)}
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
              <MenuItem text="Edit" onClick={() => onClick(Action.edit)} />
              <MenuItem text="Delete" onClick={() => onClick(Action.delete)} />
            </SanityMenu>
          }
          popover={{ placement: 'bottom' }}
        />
      )}
    </>
  );
};

export default Menu;
