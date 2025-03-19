import { ThemeProvider } from '@sanity/ui';
import { buildTheme } from '@sanity/ui/theme';
import { render } from '@testing-library/react';
import React from 'react';
import type { RenderOptions, RenderResult } from '@testing-library/react';
import type { ReactElement } from 'react';

interface AllProvidersProps {
  children: React.ReactNode;
  innerWrapper?: React.JSXElementConstructor<{
    children: React.ReactNode;
  }>;
}

const theme = buildTheme();

const AllProviders = ({ children, innerWrapper }: AllProvidersProps) => {
  const InnerWrapper = innerWrapper;

  if (InnerWrapper)
    return (
      <ThemeProvider theme={theme}>
        <InnerWrapper>{children}</InnerWrapper>
      </ThemeProvider>
    );
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

const customRender = (
  ui: ReactElement,
  options: RenderOptions = {}
): RenderResult => {
  const { wrapper, ...rest } = options;
  return render(ui, {
    wrapper: (props) => <AllProviders {...props} innerWrapper={wrapper} />,
    ...rest,
  });
};

// eslint-disable-next-line import/export
export * from '@testing-library/react';
// eslint-disable-next-line import/export
export { customRender as render };
