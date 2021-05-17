import React, { useState, useEffect } from "react";
import { PatchEvent, set, unset } from "part:@sanity/form-builder/patch-event";

import FormField from "part:@sanity/components/formfields/default";
import Popup from "./Popup";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import Nav from "./navigation";
import Tabs from "./Tabs";

import { getIcons, renderIcon } from "../utils/icons";

const IconPicker = React.forwardRef((props, ref) => {
  const { type, value, onChange } = props;
  const [selected, setSelected] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [icons, setIcons] = useState([]);
  const [queryResults, setQueryResults] = useState([]);
  const [query, setQuery] = useState("");

  function getIconByValue(value, icons) {
    const found = icons.find((icon) => icon.name === value);
    return found || null;
  }

  useEffect(() => {
    const icons = getIcons(type.options);

    setSelected(getIconByValue(value, icons));
    setIcons(icons);
    setQueryResults(icons);
  }, []);

  const unsetIcon = () => {
    onChange(PatchEvent.from(unset()));
    setSelected(null);
  };

  const setIcon = (icon) => {
    if (selected && icon.name === selected.name) return unsetIcon();

    onChange(
      PatchEvent.from(set({ provider: icon.provider, prefix: icon.prefix }))
    );
    setSelected(icon);
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };
  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const onQueryChange = (e) => {
    const value = e.target.value;

    const results = icons.filter((icon) => icon.name.indexOf(value) >= 0);
    setQueryResults(results);
    setQuery(value);
  };
  const handlePreviewClick = () => {
    setIsPopupOpen(true);
  };

  const handleButtonClick = (addIcon) => {
    if (addIcon) return openPopup();
    unsetIcon();
  };

  return (
    <FormField label={type.title} description={type.description}>
      <Nav.Container>
        <Nav.Preview
          selected={selected}
          onClick={handlePreviewClick}
          renderIcon={renderIcon}
        />
        <Nav.Button selected={selected} onClick={handleButtonClick} />
      </Nav.Container>

      <Popup onClose={closePopup} isOpen={isPopupOpen}>
        <SearchBar value={query} onChange={onQueryChange} />
        <Tabs options={type.options}>
          <SearchResults
            results={queryResults}
            renderIcon={renderIcon}
            selected={selected}
            onSelect={setIcon}
          />
        </Tabs>
      </Popup>
    </FormField>
  );
});

export default IconPicker;
