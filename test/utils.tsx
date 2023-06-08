import { studioTheme, ThemeProvider } from '@sanity/ui';
import { render } from '@testing-library/react';
import React from 'react';
import type { RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';

const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider theme={studioTheme}>{children}</ThemeProvider>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllProviders, ...options });

// eslint-disable-next-line import/export
export * from '@testing-library/react';
// eslint-disable-next-line import/export
export { customRender as render };
