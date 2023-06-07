import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { render } from '../test-utils';
import SearchBar from './SearchBar';

function setup(FormComponent: any, props: any) {
  let onChange;
  function TestEnvironment() {
    const [value, setValue] = useState(props.value);

    onChange = jest.fn((e) => {
      setValue(e.target.value);
    });

    return <FormComponent value={value} onChange={onChange} />;
  }

  return {
    ...render(<TestEnvironment />),
    onChange,
  };
}

describe('SearchBar', () => {
  const INITIAL_VALUE = 'test123';

  test('renders without error', () => {
    const { getByPlaceholderText } = render(
      <SearchBar value={INITIAL_VALUE} onChange={jest.fn()} />
    );
    const input = getByPlaceholderText('Search Icons');
    expect(input).toBeInTheDocument();
  });

  test('calls onChange successfully', async () => {
    const TEST_VALUE = 'user123';
    const user = userEvent.setup();
    const { onChange, getByPlaceholderText } = setup(SearchBar, {
      value: INITIAL_VALUE,
    });

    const input = getByPlaceholderText('Search Icons');

    await user.clear(input);
    await user.type(input, TEST_VALUE);

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: TEST_VALUE,
        }),
      })
    );
  });
});
