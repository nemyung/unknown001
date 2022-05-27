import * as React from "react";
import { BrowserRouter } from "react-router-dom";

import ThemeProvider from "./theme";
import { AuthProvider } from "./auth";

function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>{children}</AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default AppProviders;
