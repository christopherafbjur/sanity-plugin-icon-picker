import userEvent from '@testing-library/user-event';
import { render } from '../../../test/utils';
import { OptionsProvider } from '../../hooks/useOptions';
import { Tab, TabList, TabPanel, Tabs } from '.';
import type { ReactElement } from 'react';

const tabsRender = (ui: ReactElement) =>
  render(ui, {
    wrapper: ({ children }: { children: ReactElement }) => (
      <OptionsProvider>
        <Tabs>{children}</Tabs>
      </OptionsProvider>
    ),
  });

describe('Tab', () => {
  it('calls onClick when tab rendered based on provider is clicked', async () => {
    const user = userEvent.setup();
    const mockOnClick = jest.fn();
    const { getByRole } = tabsRender(
      <Tab provider="f7" onClick={mockOnClick} />
    );

    const button = getByRole('tab', { name: /Framework7/i });

    await user.click(button);
    expect(mockOnClick).toHaveBeenCalled();
  });
});

describe('TabList', () => {
  it('renders two tabs with correct titles', () => {
    const mockOnClick = jest.fn();
    const { getByRole, getAllByRole } = tabsRender(
      <TabList providers={['f7', 'sa']} onClick={mockOnClick} />
    );

    expect(getAllByRole('tab').length).toBe(2);
    expect(getByRole('tab', { name: /Framework7/i })).toBeInTheDocument();
    expect(getByRole('tab', { name: /Sanity Icons/i })).toBeInTheDocument();
  });
});

describe('TabPanel', () => {
  it('renders a heading title based on the provider', () => {
    const { getByText } = tabsRender(
      <TabPanel provider="f7">
        <div>Child 1</div>
      </TabPanel>
    );

    expect(getByText('Framework7')).toBeInTheDocument();
  });
  it('renders the content provided as child', () => {
    const { getByText } = tabsRender(
      <TabPanel provider="f7">
        <div>Child 1</div>
      </TabPanel>
    );

    expect(getByText('Child 1')).toBeInTheDocument();
  });
});

describe('Tabs', () => {
  it('renders children correctly', () => {
    const { getByText } = tabsRender(
      <>
        <div>Child 1</div>
        <div>Child 2</div>
      </>
    );

    expect(getByText('Child 1')).toBeInTheDocument();
    expect(getByText('Child 2')).toBeInTheDocument();
  });

  it('displays the correct tab-panel based on the initially selected list-tab', () => {
    const mockOnClick = jest.fn();
    const mockProviders = ['all-icons', 'f7', 'sa'];

    const { container } = tabsRender(
      <>
        <TabList providers={mockProviders} onClick={mockOnClick} />
        <>
          {mockProviders.map((provider) => (
            <TabPanel key={provider} provider={provider}>
              <div>{`${provider}-content`}</div>
            </TabPanel>
          ))}
        </>
      </>
    );

    const allIconsPanel = container.querySelector('#all-icons-panel');
    const f7Panel = container.querySelector('#f7-panel');
    const saPanel = container.querySelector('#sa-panel');

    expect(allIconsPanel).not.toHaveAttribute('hidden');
    expect(f7Panel).toHaveAttribute('hidden');
    expect(saPanel).toHaveAttribute('hidden');
  });
  it('displays and hides the correct tab-panels based on the selected list-tab', async () => {
    const user = userEvent.setup();
    const mockOnClick = jest.fn();
    const mockProviders = ['all-icons', 'f7', 'sa'];

    const { container, getByRole } = tabsRender(
      <>
        <TabList providers={mockProviders} onClick={mockOnClick} />
        <>
          {mockProviders.map((provider) => (
            <TabPanel key={provider} provider={provider}>
              <div>{`${provider}-content`}</div>
            </TabPanel>
          ))}
        </>
      </>
    );

    const allIconsTab = getByRole('tab', { name: /All Icons/i });
    const f7Tab = getByRole('tab', { name: /Framework7/i });
    const saTab = getByRole('tab', { name: /Sanity Icons/i });

    const allIconsPanel = container.querySelector('#all-icons-panel');
    const f7Panel = container.querySelector('#f7-panel');
    const saPanel = container.querySelector('#sa-panel');

    await user.click(f7Tab);
    expect(allIconsPanel).toHaveAttribute('hidden');
    expect(f7Panel).not.toHaveAttribute('hidden');
    expect(saPanel).toHaveAttribute('hidden');

    await user.click(saTab);
    expect(allIconsPanel).toHaveAttribute('hidden');
    expect(f7Panel).toHaveAttribute('hidden');
    expect(saPanel).not.toHaveAttribute('hidden');

    await user.click(allIconsTab);
    expect(allIconsPanel).not.toHaveAttribute('hidden');
    expect(f7Panel).toHaveAttribute('hidden');
    expect(saPanel).toHaveAttribute('hidden');
  });
});
