import { useEffect, useState } from 'react';
import type { IconObject, IconObjectArray } from '../types';
import type { Dispatch, SetStateAction } from 'react';

interface UseSelectedIconReturnValue {
  selected: IconObject | null;
  setSelected: Dispatch<SetStateAction<IconObject | null>>;
}

function getIconByValue(name: string, icons: IconObjectArray) {
  const found = icons.find((icon) => icon.name === name);
  return found || null;
}

export const useSelectedIcon = (
  iconName: string,
  results: IconObjectArray
): UseSelectedIconReturnValue => {
  const [selected, setSelected] = useState<IconObject | null>(null);

  useEffect(() => {
    setSelected(getIconByValue(iconName, results));
  }, [results]);

  return { selected, setSelected };
};
