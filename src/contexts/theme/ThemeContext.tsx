import React from "react";

import { ThemeProvider as EmotionThemeProvider, Global, css } from "@emotion/react";
import emotionReset from "emotion-reset";

import { theme } from "./theme";

function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <EmotionThemeProvider theme={theme}>
      <Global
        styles={css`
          ${emotionReset}
        `}
      />
      {children}
    </EmotionThemeProvider>
  );
}

export { ThemeProvider };
