import React, { useState } from "react";
import { Grid, Button, Box, Container, Text } from "@sanity/ui";

const SearchResults = ({ results, selected, renderIcon, onSelect }) => {
  return (
    <Container height="stretch">
      <Box marginTop={4}>
        <Grid rows={4} columns={[2, 3, 4, 6]} gap={[2, 2, 2, 2]}>
          {results &&
            results.map((result) => {
              return (
                <Button
                  fontSize={[2, 2, 3]}
                  /* icon={AddIcon} */
                  key={result.name}
                  mode="ghost"
                  padding={[3, 3, 4]}
                  tone="default"
                  text={renderIcon(result)}
                  onClick={() => onSelect(result)}
                  selected={selected && result.name === selected.name}
                />
              );
            })}
        </Grid>
      </Box>
    </Container>
  );
};

export default SearchResults;
