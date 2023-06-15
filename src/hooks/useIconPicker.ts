import { useEffect, useState } from 'react';
import { LOADING_TIMER_MS } from '../constants';
import { getIcons } from '../utils/icons';
import type { IconObject, IconObjectArray, IconPickerOptions } from '../types';
import type { Dispatch, SetStateAction } from 'react';

interface UseIconPicker {
  (iconName: string, options: IconPickerOptions): UseIconPickerReturnValue;
}

interface UseIconPickerReturnValue {
  query: string;
  loading: boolean;
  selected: IconObject | null;
  queryResults: IconObjectArray;
  setQuery: Dispatch<SetStateAction<string>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setSelected: Dispatch<SetStateAction<IconObject | null>>;
}

function getIconByValue(name: string, icons: IconObjectArray) {
  const found = icons.find((icon) => icon.name === name);
  return found || null;
}

export const useIconPicker: UseIconPicker = (iconName, options) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<IconObject | null>(null);
  const [queryResults, setQueryResults] = useState<IconObjectArray>([]);

  useEffect(() => {
    if (!loading) {
      setLoading(true);
    }
    const timeoutId = setTimeout(() => {
      const icons = getIcons(options);
      const results = icons.filter(
        ({ name }) => name.toLowerCase().indexOf(query) >= 0
      );
      setSelected(getIconByValue(iconName, icons));
      setQueryResults(results);
      setLoading(false);
    }, LOADING_TIMER_MS);
    return () => clearTimeout(timeoutId);
  }, [query]);

  return {
    query,
    loading,
    selected,
    queryResults,
    setQuery,
    setLoading,
    setSelected,
  };
};
