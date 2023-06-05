import { useState, useEffect, CSSProperties } from 'react';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import styled from 'styled-components';
import { Button, Grid, Flex, Spinner, Text } from '@sanity/ui';
import useMedia from '../hooks/useMedia';
import { listToMatrix } from '../utils/helpers';
import { IconObject, IconObjectArray } from '../types';

const Wrapper = styled.section`
  min-height: 200px;
  width: 100%;
  position: relative;
`;
export type SearchResultsOnSelectCallback = (icon: IconObject) => void;

interface ISearchResults {
  results: IconObjectArray;
  selected: IconObject | null;
  onSelect: SearchResultsOnSelectCallback;
  // eslint-disable-next-line react/require-default-props
  filter?: string;
  loading: boolean;
  query: string;
}

const SearchResults = ({
  results,
  selected,
  onSelect,
  filter,
  loading,
  query,
}: ISearchResults) => {
  const [filtered, setFiltered] = useState<IconObjectArray[]>([]);
  const COLUMNS_COUNT = useMedia(
    // Media queries
    ['(min-width: 960px)', '(min-width: 640px)', '(min-width: 512px)'],
    // Column counts (relates to above media queries by array index)
    [6, 4, 2],
    // Default column count
    1
  );

  useEffect(() => {
    updateIcons(COLUMNS_COUNT);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results]);

  const getFiltered = (items: IconObjectArray) => {
    if (!filter) return items;
    return items.filter((item) => item.provider === filter);
  };
  function updateIcons(cols: number) {
    const icons = getFiltered(results);
    const mappedIcons = listToMatrix(Object.values(icons), cols);
    setFiltered(mappedIcons);
  }

  const createIconButton = (icon: IconObject) => {
    return (
      <Button
        key={icon.provider.concat(icon.name)}
        mode="ghost"
        onClick={() => onSelect(icon)}
        text={<icon.component />}
        style={{ marginTop: '5px' }}
        selected={
          !!selected &&
          selected.provider === icon.provider &&
          icon.name === selected.name
        }
      />
    );
  };

  const Row = ({ index, style }: { index: number; style: CSSProperties }) => {
    return (
      <Grid
        key={index.toString()}
        style={style}
        columns={[1, 2, 4, 6]}
        gap={[1, 1, 1, 1]}
      >
        {filtered[index].map(createIconButton)}
      </Grid>
    );
  };

  const onResize = () => {
    updateIcons(COLUMNS_COUNT);
  };

  return (
    <Wrapper>
      {loading && (
        <Flex
          align="center"
          justify="center"
          style={{ width: '100%', height: '100%', position: 'absolute' }}
        >
          <Spinner size={4} muted />
        </Flex>
      )}
      {!loading && !!filtered.length && (
        <AutoSizer onResize={onResize}>
          {({ height, width }) => (
            <List
              height={height}
              itemCount={filtered.length}
              itemSize={45}
              width={width}
            >
              {Row}
            </List>
          )}
        </AutoSizer>
      )}
      {!loading && !filtered.length && (
        <Flex
          align="center"
          justify="center"
          style={{ width: '100%', height: '100%', position: 'absolute' }}
        >
          <Text>{`No results found for "${query}"`}</Text>
        </Flex>
      )}
    </Wrapper>
  );
};

export default SearchResults;
