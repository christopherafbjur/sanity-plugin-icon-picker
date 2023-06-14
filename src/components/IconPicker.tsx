import { Card } from '@sanity/ui';
import { useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { set, setIfMissing, unset } from 'sanity';
import { ICON_HEIGHT, ICON_WIDTH, LOADING_TIMER_MS } from '../constants';
import { ALL_CONFIGURATIONS_PROVIDER } from '../constants/config';
import { OptionsProvider } from '../hooks/useOptions';
import { getProviders } from '../utils/helpers';
import { getIcons } from '../utils/icons';
import Menu, { Action } from './Menu';
import Popup from './Popup';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import { TabList, TabPanel, Tabs } from './Tabs';
import type { MenuClickCallback } from './Menu';
import type { SearchBarOnChange } from './SearchBar';
import type { SearchResultsOnSelectCallback } from './SearchResults';
import type { IconObject, IconObjectArray, IconPickerOptions } from '../types';
import type { ObjectInputProps } from 'sanity';

function getIconByValue(name: string, icons: IconObjectArray) {
  const found = icons.find((icon) => icon.name === name);
  return found || null;
}

const IconPicker = ({ schemaType, value = {}, onChange }: ObjectInputProps) => {
  const [selected, setSelected] = useState<IconObject | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [queryResults, setQueryResults] = useState<IconObjectArray>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const options: IconPickerOptions = schemaType.options;

  useEffect(() => {
    if (!loading) {
      setLoading(true);
    }
    const timeoutId = setTimeout(() => {
      const icons = getIcons(options);
      const results = icons.filter(
        (icon) => icon.name.toLowerCase().indexOf(query) >= 0
      );
      setSelected(getIconByValue(value.name, icons));
      setQueryResults(results);
      setLoading(false);
    }, LOADING_TIMER_MS);
    return () => clearTimeout(timeoutId);
  }, [query]);

  const unsetIcon = () => {
    onChange(unset());
    setSelected(null);
  };

  const setIcon: SearchResultsOnSelectCallback = (
    icon: IconObject,
    ele: HTMLButtonElement
  ) => {
    if (selected && icon.name === selected.name) return unsetIcon();

    const getSvgString = () => ele.getElementsByTagName('svg')[0].outerHTML;

    onChange([
      setIfMissing({
        _type: schemaType.name,
      }),
      set(icon.name, ['name']),
      set(icon.provider, ['provider']),
      schemaType.options.storeSvg
        ? set(getSvgString(), ['svg'])
        : unset(['svg']),
    ]);

    return setSelected(icon);
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };
  const closePopup = () => {
    setIsPopupOpen(false);
    setQuery('');
  };

  const onQueryChange: SearchBarOnChange = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);
  };
  const handleMenuClick: MenuClickCallback = (action) => {
    if (action === Action.add) return setIsPopupOpen(true);
    if (action === Action.edit) return openPopup();
    if (action === Action.delete) return unsetIcon();
    return new Error('Unsupported action');
  };

  const onTabClick = () => {
    if (!loading) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, LOADING_TIMER_MS);
    }
  };

  const providers = getProviders(options);
  const tabProviders = [ALL_CONFIGURATIONS_PROVIDER, ...providers];
  const hideTabs = providers.length === 1;

  return (
    <Card>
      <OptionsProvider options={options}>
        <IconContext.Provider
          value={{ style: { width: ICON_WIDTH, height: ICON_HEIGHT } }}
        >
          <Menu onClick={handleMenuClick} selected={selected} />

          <Popup onClose={closePopup} isOpen={isPopupOpen}>
            <SearchBar value={query} onChange={onQueryChange} />
            {hideTabs ? (
              <SearchResults
                results={queryResults}
                selected={selected}
                onSelect={setIcon}
                loading={loading}
                query={query}
              />
            ) : (
              <Tabs>
                <TabList providers={tabProviders} onClick={onTabClick} />
                <>
                  {tabProviders.map((provider) => (
                    <TabPanel key={provider} provider={provider}>
                      <SearchResults
                        results={queryResults}
                        selected={selected}
                        onSelect={setIcon}
                        loading={loading}
                        query={query}
                        filter={provider}
                      />
                    </TabPanel>
                  ))}
                </>
              </Tabs>
            )}
          </Popup>
        </IconContext.Provider>
      </OptionsProvider>
    </Card>
  );
};

export default IconPicker;
