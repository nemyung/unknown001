import * as React from "react";
import { getToken, setToken, removeToken } from "../../core/helpers";
import SETTING from "core/constants";

type AuthenticationDisaptch = React.Dispatch<React.SetStateAction<boolean>>;
interface AuthContextValue {
  isLoginned: boolean;
  dispatch: AuthenticationDisaptch;
}

const AuthContext = React.createContext<AuthContextValue | null>(null);
AuthContext.displayName = "AuthContext";

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoginned, dispatch] = React.useState(() =>
    typeof getToken() === "string" && Object.is(getToken(), SETTING.fakeAccessToken) ? true : false
  );

  return <AuthContext.Provider value={{ isLoginned, dispatch }}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error(`The useAuth() must be called within <AuthProvider />`);
  }
  return context;
}

function fakeLogin(dispatch: AuthenticationDisaptch) {
  setToken();
  dispatch(true);
}

function fakeLogout(dispatch: AuthenticationDisaptch) {
  removeToken();
  dispatch(false);
}

export { AuthProvider, useAuth, fakeLogin, fakeLogout };
