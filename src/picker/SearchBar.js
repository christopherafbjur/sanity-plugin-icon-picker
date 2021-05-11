import React from "react";

import { TextInput } from "@sanity/ui";

const SearchBar = ({ value, onChange }) => {
  return (
    <TextInput
      fontSize={[2, 2, 3, 4]}
      padding={[3, 3, 4]}
      value={value}
      onChange={onChange}
    />
  );
};

export default SearchBar;