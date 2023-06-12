import { studioTheme, ThemeProvider } from '@sanity/ui';
import { render } from '@testing-library/react';
import React from 'react';
import type { RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';

interface AllProvidersProps {
  children: React.ReactElement;
  innerWrapper?: React.JSXElementConstructor<{
    children: React.ReactElement;
  }>;
}

const AllProviders = ({ children, innerWrapper }: AllProvidersProps) => {
  const InnerWrapper = innerWrapper;

  if (InnerWrapper)
    return (
      <ThemeProvider theme={studioTheme}>
        <InnerWrapper>{children}</InnerWrapper>
      </ThemeProvider>
    );
  return <ThemeProvider theme={studioTheme}>{children}</ThemeProvider>;
};

const customRender = (ui: ReactElement, options: RenderOptions = {}) => {
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
