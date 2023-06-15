import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { render } from '../../test/utils';
import SearchBar from './SearchBar';

function renderControlledComponent(FormComponent: any, props: any) {
  let mockOnChange;
  function TestEnvironment() {
    const [value, setValue] = useState(props.value);

    mockOnChange = jest.fn((e) => setValue(e.target.value));

    return <FormComponent value={value} onChange={mockOnChange} />;
  }

  return {
    ...render(<TestEnvironment />),
    mockOnChange,
  };
}

describe('SearchBar', () => {
  const INITIAL_VALUE = 'test123';
  const mockOnChangeHandler = jest.fn();

  it('renders correctly', () => {
    const { getByPlaceholderText } = render(
      <SearchBar value="" onChange={mockOnChangeHandler} />
    );
    expect(getByPlaceholderText('Search Icons')).toBeInTheDocument();
  });

  it('renders value prop', () => {
    const { getByDisplayValue } = render(
      <SearchBar value="test value" onChange={mockOnChangeHandler} />
    );
    expect(getByDisplayValue('test value')).toBeInTheDocument();
  });

  it('calls onChange successfully', async () => {
    const value = 'user123';
    const user = userEvent.setup();
    const { mockOnChange, getByPlaceholderText } = renderControlledComponent(
      SearchBar,
      {
        value: INITIAL_VALUE,
      }
    );

    const input = getByPlaceholderText('Search Icons');

    await user.clear(input);
    await user.type(input, value);

    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value,
        }),
      })
    );
  });
});
