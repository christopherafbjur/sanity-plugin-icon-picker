import React from "react";
import { Grid, Button, Box, Tooltip, Text } from "@sanity/ui";

const SearchResults = ({ results, selected, renderIcon, onSelect, filter }) => {
  const filtered = (items) => {
    if (!filter) return items;
    return items.filter((item) => item.provider === filter);
  };
  return (
    <Box marginTop={4}>
      <Grid rows={4} columns={[2, 3, 4, 6]} gap={[2, 2, 2, 2]}>
        {results &&
          filtered(results).map((result, i) => {
            return (
              <Tooltip
                key={`${result.name}-${i}`}
                content={
                  <Box padding={2}>
                    <Text muted size={1}>
                      {result.name}
                    </Text>
                  </Box>
                }
                fallbackPlacements={["right", "left"]}
                placement="bottom"
              >
                <Button
                  fontSize={[2, 2, 3]}
                  /* icon={AddIcon} */
                  mode="ghost"
                  padding={[3, 3, 4]}
                  tone="default"
                  text={renderIcon(result)}
                  onClick={() => onSelect(result)}
                  selected={selected && result.name === selected.name}
                />
              </Tooltip>
            );
          })}
      </Grid>
    </Box>
  );
};

export default SearchResults;
