import { useEffect, useMemo, useState } from 'react';
import { LOADING_TIMER_MS } from '../constants';
import { getIcons } from '../utils/icons';
import useDebouncedCallback from './useDebouncedCallback';
import type { IconObjectArray, IconPickerOptions } from '../types';
import type { Dispatch, SetStateAction } from 'react';

interface UseQueryProps {
  (options: IconPickerOptions): UseQueryResult;
}

interface UseQueryResult {
  query: string;
  loading: boolean;
  results: IconObjectArray;
  setQuery: Dispatch<SetStateAction<string>>;
}

export const useQuery: UseQueryProps = (options) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<IconObjectArray>([]);
  const icons = useMemo(() => getIcons(options), [options]);

  const debouncedFetchIcons = useDebouncedCallback(() => {
    const queryResults = icons.filter(({ name }) =>
      name.toLowerCase().includes(query.toLowerCase())
    );
    setResults(queryResults);
    setLoading(false);
  }, LOADING_TIMER_MS);

  useEffect(() => {
    if (!loading) {
      setLoading(true);
    }
    debouncedFetchIcons();
  }, [query]);

  return {
    query,
    loading,
    results,
    setQuery,
  };
};
