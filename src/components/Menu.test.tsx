import userEvent from '@testing-library/user-event';
import { createMockIcon } from '../../test/mocks';
import { render } from '../../test/utils';
import Menu, { Action } from './Menu';

describe('Menu', () => {
  const mockOnClick = jest.fn();

  it('renders add icon button when selected is null', () => {
    const { getByText } = render(
      <Menu onClick={mockOnClick} selected={null} />
    );
    expect(getByText('Add icon')).toBeInTheDocument();
  });

  it('renders menu button when selected is not null', async () => {
    const selected = createMockIcon();
    const user = userEvent.setup();
    const { getByText, getByRole } = render(
      <Menu onClick={mockOnClick} selected={selected} />
    );

    await user.click(getByRole('button'));

    expect(getByText('Edit')).toBeInTheDocument();
    expect(getByText('Delete')).toBeInTheDocument();
  });

  it('calls onClick with correct action when add icon button is clicked', async () => {
    const user = userEvent.setup();
    const { getByText } = render(
      <Menu onClick={mockOnClick} selected={null} />
    );
    await user.click(getByText('Add icon'));
    expect(mockOnClick).toHaveBeenCalledWith(Action.add);
  });

  it('calls onClick with correct action when edit menu item is clicked', async () => {
    const user = userEvent.setup();
    const selected = createMockIcon();
    const { getByText, getByRole } = render(
      <Menu onClick={mockOnClick} selected={selected} />
    );
    await user.click(getByRole('button'));
    await user.click(getByText('Edit'));
    expect(mockOnClick).toHaveBeenCalledWith(Action.edit);
  });

  it('calls onClick with correct action when delete menu item is clicked', async () => {
    const user = userEvent.setup();
    const selected = createMockIcon();
    const { getByText, getByRole } = render(
      <Menu onClick={mockOnClick} selected={selected} />
    );

    await user.click(getByRole('button'));
    await user.click(getByText('Delete'));
    expect(mockOnClick).toHaveBeenCalledWith(Action.delete);
  });

  it('renders disabled state when readOnly is true', () => {
    const { getByText } = render(
      <Menu onClick={mockOnClick} selected={null} readOnly={true} />
    );
    expect(getByText('Add icon').closest('button')).toBeDisabled();
  });
});
