import * as React from "react";

import { render as rtlRender, RenderOptions } from "@testing-library/react";

import AppProviders from "contexts/AppProviders";
import { BrowserRouter } from "react-router-dom";

function render(ui: React.ReactElement, options?: RenderOptions) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <AppProviders>{children}</AppProviders>;
  }

  return rtlRender(ui, { wrapper: Wrapper, ...options });
}

function renderWithRouter(ui: React.ReactElement, { route = "/" }: { route: string }) {
  window.history.pushState({}, "TEST", route);

  return {
    ...rtlRender(ui, { wrapper: BrowserRouter }),
  };
}

export * from "@testing-library/react";
export { render, renderWithRouter, rtlRender };
