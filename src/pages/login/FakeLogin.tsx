import * as React from "react";
import styled from "@emotion/styled";

import { useAuth, fakeLogin } from "contexts/auth";

import * as Primitives from "../../style/primitives";

const FullPage = styled(Primitives.Main)`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > h1 {
    font-size: ${({ theme }) => `${theme.fontSize[400]}px`};
    margin-bottom: 1rem;
  }
  & > button {
    width: 100px;
    height: 30px;
    color: ${({ theme }) => theme.color.g[100]};
    background-color: ${({ theme }) => theme.color.r[200]};
    border-radius: 10px;
  }
`;

function FakeLogin() {
  const { dispatch } = useAuth();
  const login = () => fakeLogin(dispatch);

  return (
    <FullPage>
      <h1 role="alert">Please login first</h1>
      <button onClick={login}>Login</button>
    </FullPage>
  );
}

export default FakeLogin;
