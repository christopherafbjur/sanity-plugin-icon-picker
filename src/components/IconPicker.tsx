import { Card } from '@sanity/ui';
import { useState } from 'react';
import { IconContext } from 'react-icons';
import { set, setIfMissing, unset } from 'sanity';
import { ICON_HEIGHT, ICON_WIDTH } from '../constants';
import { ALL_CONFIGURATIONS_PROVIDER } from '../constants/config';
import { OptionsProvider } from '../hooks/useOptions';
import { useQuery } from '../hooks/useQuery';
import { useSelectedIcon } from '../hooks/useSelectedIcon';
import { getProviders } from '../utils/helpers';
import Menu, { Action } from './Menu';
import Popup from './Popup';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import { TabList, TabPanel, Tabs } from './Tabs';
import type { MenuClickCallback } from './Menu';
import type { SearchBarOnChange } from './SearchBar';
import type { SearchResultsOnSelectCallback } from './SearchResults';
import type { IconObject, IconPickerOptions } from '../types';
import type { ObjectInputProps } from 'sanity';

const IconPicker = ({ schemaType, value = {}, onChange }: ObjectInputProps) => {
  const options: IconPickerOptions = schemaType.options;
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { query, loading, results, setQuery } = useQuery(options);
  const { selected, setSelected } = useSelectedIcon(value.name, results);

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

  const providers = getProviders(options);
  const tabProviders = [ALL_CONFIGURATIONS_PROVIDER, ...providers];
  const hideTabs = providers.length === 1;
  const searchResultsProps = {
    onSelect: setIcon,
    results,
    selected,
    loading,
    query,
  };

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
              <SearchResults {...searchResultsProps} />
            ) : (
              <Tabs>
                <TabList providers={tabProviders} />
                <>
                  {tabProviders.map((provider) => (
                    <TabPanel key={provider} provider={provider}>
                      <SearchResults
                        {...searchResultsProps}
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
