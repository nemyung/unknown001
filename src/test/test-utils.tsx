import * as React from "react";
import { render as rtlRender, RenderOptions } from "@testing-library/react";

import AppProviders from "contexts/AppProviders";

function render(ui: React.ReactElement, options?: RenderOptions) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <AppProviders>{children}</AppProviders>;
  }

  return rtlRender(ui, { wrapper: Wrapper, ...options });
}

export * from "@testing-library/react";
export { render };
