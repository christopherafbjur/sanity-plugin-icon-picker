import React, { useState, useEffect } from "react";
import { PatchEvent, set, unset } from "part:@sanity/form-builder/patch-event";
import { Badge } from "@sanity/ui";

import FormField from "part:@sanity/components/formfields/default";
import Popup from "./Popup";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import Nav from "./navigation";

import styles from "framework7-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import * as f7Icons from "framework7-icons/react";
import * as faIcons from "@fortawesome/free-solid-svg-icons";

function pascalToSnakeCase(string) {
  return string
    .replace(/(?:^|\.?)([A-Z])/g, function (x, y) {
      return "_" + y.toLowerCase();
    })
    .replace(/^_/, "");
}

const IconPicker = React.forwardRef((props, ref) => {
  const { type, value, onChange } = props;
  const [selected, setSelected] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [icons, setIcons] = useState([]);
  const [queryResults, setQueryResults] = useState([]);
  const [query, setQuery] = useState("");

  function getFaIcons() {
    const icons = Object.keys(faIcons)
      .map((icon) => faIcons[icon])
      .filter((icon) => typeof icon.iconName !== "undefined");

    library.add(...icons);

    return icons
      .map(({ iconName, icon }) => ({
        from: "fa",
        name: iconName,
      }))
      .splice(0, 10);
  }
  function getF7Icons() {
    const icons = Object.values(f7Icons)
      .map(({ name }) => ({
        from: "f7",
        name: pascalToSnakeCase(name),
        icon: null,
      }))
      .splice(0, 10);
    return icons;
  }
  function getIconByValue(value, icons) {
    const found = icons.find((icon) => icon.name === value);
    return found || null;
  }

  useEffect(() => {
    const icons = [...getF7Icons(), ...getFaIcons()];

    setSelected(getIconByValue(value, icons));
    setIcons(icons);
    setQueryResults(icons);
  }, []);
  const renderIcon = (icon) => {
    if (!icon) return null;

    if (icon.from === "f7")
      return (
        <span>
          <i className={styles["f7-icons"]}>{icon.name}</i>
          <Badge tone="primary">F7</Badge>
        </span>
      );

    if (icon.from === "fa")
      return (
        <span>
          <FontAwesomeIcon icon={icon.name} />
          <Badge tone="primary">FA</Badge>
        </span>
      );
  };

  const unsetIcon = () => {
    onChange(PatchEvent.from(unset()));
    setSelected(null);
  };

  const setIcon = (icon) => {
    if (selected && icon.name === selected.name) return unsetIcon();

    onChange(PatchEvent.from(set(icon.name)));
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
