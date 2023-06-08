import userEvent from '@testing-library/user-event';
import { render } from '../../test/utils';
import Popup from './Popup';

describe('Popup', () => {
  const mockOnClose = jest.fn();

  it('renders correctly when isOpen is true', () => {
    const { getByText } = render(
      <Popup onClose={mockOnClose} isOpen>
        <div>Test content</div>
      </Popup>
    );
    expect(getByText('Test content')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    const { queryByText } = render(
      <Popup onClose={mockOnClose} isOpen={false}>
        <div>Test content</div>
      </Popup>
    );
    expect(queryByText('Test content')).not.toBeInTheDocument();
  });

  it('calls onClose when Dialog onClose is triggered', async () => {
    const user = userEvent.setup();
    const { getByRole } = render(
      <Popup onClose={mockOnClose} isOpen>
        <div>Test content</div>
      </Popup>
    );
    await user.click(getByRole('button'));
    expect(mockOnClose).toHaveBeenCalled();
  });
});
