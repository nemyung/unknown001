import * as React from "react";
import { useAuth, fakeLogin } from "contexts/auth";

function FakeLogin() {
  const { dispatch } = useAuth();
  const login = () => fakeLogin(dispatch);

  return (
    <main
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 role="alert">You are not logined</h1>
      <button onClick={login}>Login</button>
    </main>
  );
}

export default FakeLogin;
