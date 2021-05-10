import React, { useState, useEffect } from "react";
import { PatchEvent, set, unset } from "part:@sanity/form-builder/patch-event";
import * as Icons from "framework7-icons/react";
import FormField from "part:@sanity/components/formfields/default";
import Popup from "./Popup";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import Nav from "./navigation";

import styles from "framework7-icons";

function pascalToSnakeCase(string) {
  return string
    .replace(/(?:^|\.?)([A-Z])/g, function (x, y) {
      return "_" + y.toLowerCase();
    })
    .replace(/^_/, "");
}

// const iconsArray = [Icons.Airplane, Icons.Alarm, Icons.AntCircleFill];
const IconPicker = React.forwardRef((props, ref) => {
  const { type, value, onChange } = props;
  const [selected, setSelected] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [icons, setIcons] = useState([]);
  const [queryResults, setQueryResults] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const icons = Object.values(Icons).map(({ name }) =>
      pascalToSnakeCase(name)
    );

    setSelected(value);
    setIcons(icons);
    setQueryResults(icons);
  }, []);
  const renderIcon = (prefix) => {
    return <i className={styles["f7-icons"]}>{prefix}</i>;
  };

  const unsetIcon = () => {
    onChange(PatchEvent.from(unset()));
    setSelected(null);
  };

  const setIcon = (icon) => {
    if (icon === selected) return unsetIcon();

    onChange(PatchEvent.from(set(icon)));
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

    const results = icons.filter((icon) => icon.indexOf(value) >= 0);
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
        <SearchResults
          results={queryResults}
          selected={selected}
          onSelect={setIcon}
          renderIcon={renderIcon}
        />
      </Popup>
    </FormField>
  );
});

export default IconPicker;
