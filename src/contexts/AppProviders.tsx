import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./auth";

function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <BrowserRouter>
      <AuthProvider>{children}</AuthProvider>
    </BrowserRouter>
  );
}

export default AppProviders;
