import React, { useState, useEffect } from "react";
import {
  PatchEvent,
  setIfMissing,
  set,
  unset,
} from "part:@sanity/form-builder/patch-event";

import FormField from "part:@sanity/components/formfields/default";
import Popup from "./components/Popup";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import Tabs from "./components/Tabs";
import Menu from "./components/Menu";

import { getIcons } from "./utils/icons";
import { Card } from "@sanity/ui";

const LOADING_TIMER_MS = 400;

const IconPicker = React.forwardRef((props, ref) => {
  const { type, value = {}, onChange } = props;
  const [selected, setSelected] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [queryResults, setQueryResults] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  function getIconByValue({ name }, icons) {
    const found = icons.find((icon) => icon.name === name);
    return found || null;
  }

  useEffect(() => {
    if (!loading) {
      setLoading(true);
    }
    const timeoutId = setTimeout(() => {
      const icons = getIcons(type.options);
      const results = icons.filter((icon) => icon.name.indexOf(query) >= 0);
      setSelected(getIconByValue(value, icons));
      setQueryResults(results);
      setLoading(false);
    }, LOADING_TIMER_MS);
    return () => clearTimeout(timeoutId);
  }, [query]);

  const unsetIcon = () => {
    onChange(PatchEvent.from(unset()));
    setSelected(null);
  };

  const setIcon = (icon) => {
    if (selected && icon.name === selected.name) return unsetIcon();

    onChange(
      PatchEvent.from([
        setIfMissing({
          _type: type.name,
        }),
        set(icon.provider, ["provider"]),
        set(icon.name, ["name"]),
      ])
    );
    setSelected(icon);
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };
  const closePopup = () => {
    setIsPopupOpen(false);
    setQuery("");
  };

  const onQueryChange = (e) => {
    const query = e.target.value;
    setQuery(query);
  };
  const handlePreviewClick = (action) => {
    const actions = ["add", "edit", "delete"];
    if (action === actions[0]) return setIsPopupOpen(true);
    if (action === actions[1]) return openPopup();
    if (action === actions[2]) return unsetIcon();
  };

  const onTabClick = () => {
    if (!loading) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, LOADING_TIMER_MS);
    }
  };

  return (
    <FormField label={type.title} description={type.description}>
      <Card ref={ref}>
        <Menu
          reference={ref}
          onClick={handlePreviewClick}
          selected={selected}
        />

        <Popup onClose={closePopup} isOpen={isPopupOpen}>
          <SearchBar value={query} onChange={onQueryChange} />
          <Tabs options={type.options} onClick={onTabClick}>
            <SearchResults
              results={queryResults}
              selected={selected}
              onSelect={setIcon}
              loading={loading}
              query={query}
            />
          </Tabs>
        </Popup>
      </Card>
    </FormField>
  );
});

export default IconPicker;
