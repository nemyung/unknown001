import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    color: {
      g: {
        100: string;
        200: string;
        300: string;
      };
      r: {
        100: string;
        200: string;
        300: string;
      };
    };
    fontSize: {
      100: number;
      200: number;
      300: number;
      400: number;
    };
  }
}
