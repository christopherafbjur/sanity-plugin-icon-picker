import React from "react";

import { TextInput } from "@sanity/ui";

const SearchBar = ({ value, onChange }) => {
  return (
    <TextInput
      fontSize={2}
      padding={4}
      value={value}
      placeholder="Search Icons"
      onChange={onChange}
      mode="bleed"
    />
  );
};

export default SearchBar;
