import userEvent from '@testing-library/user-event';
import React from 'react';
import { createMockIcon, createMockIconArray } from '../../test/mocks';
import { render } from '../../test/utils';
import SearchResults from './SearchResults';
import type AutoSizer from 'react-virtualized-auto-sizer';

jest.mock(
  'react-virtualized-auto-sizer',
  () =>
    ({ children }: React.ComponentProps<typeof AutoSizer>) =>
      children({ height: 600, width: 600, scaledWidth: 600, scaledHeight: 600 })
);

describe('SearchResults', () => {
  const mockOnSelect = jest.fn();
  const results = [...createMockIconArray(2)];
  const selected = createMockIcon();

  it('renders Spinner when loading is true', () => {
    const { container } = render(
      <SearchResults
        results={results}
        selected={selected}
        onSelect={mockOnSelect}
        loading
        query=""
      />
    );

    // Unable to queryByRole('progressbar), so using this ugly method instead:
    const progressbar = container.querySelector('[data-sanity-icon="spinner"]');

    expect(progressbar).toBeInTheDocument();
  });

  it('renders all icons based on the provided filter', () => {
    const mockFilterIcons = [...createMockIconArray(2, { provider: 'a' })];
    const mockAllIcons = [
      ...mockFilterIcons,
      ...createMockIconArray(2, { provider: 'b' }),
    ];
    const mockFilterIconsLength = mockFilterIcons.length;

    const { getAllByRole } = render(
      <SearchResults
        filter="a"
        results={mockAllIcons}
        selected={selected}
        onSelect={mockOnSelect}
        loading={false}
        query=""
      />
    );

    const iconButtons = getAllByRole('button');

    expect(iconButtons.length).toBe(mockFilterIconsLength);
  });

  it('renders "No results found for "{query}" when no results available', () => {
    const { getByText } = render(
      <SearchResults
        results={[]}
        selected={selected}
        onSelect={mockOnSelect}
        loading={false}
        query="test"
      />
    );
    expect(getByText('No results found for "test"')).toBeInTheDocument();
  });

  it('renders "No results found for "{query}" when nothing found by filter', () => {
    const mockAllIcons = [...createMockIconArray(2, { provider: 'a' })];

    const { getByText } = render(
      <SearchResults
        filter="b"
        results={mockAllIcons}
        selected={selected}
        onSelect={mockOnSelect}
        loading={false}
        query="test"
      />
    );

    expect(getByText('No results found for "test"')).toBeInTheDocument();
  });

  it('calls onSelect when IconButton is clicked', async () => {
    const user = userEvent.setup();
    const mockAllIcons = [...createMockIconArray(2, { provider: 'a' })];
    const { getAllByRole } = render(
      <SearchResults
        results={mockAllIcons}
        selected={selected}
        onSelect={mockOnSelect}
        loading={false}
        query=""
      />
    );
    const selectedIcon = getAllByRole('button')[0];

    await user.click(selectedIcon);
    expect(mockOnSelect).toHaveBeenCalled();
  });
});
