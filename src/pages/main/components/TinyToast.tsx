import * as React from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import useInterval from "hooks/useInterval";

const up = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const Fixed = styled.div<{ show: boolean }>`
  position: fixed;
  bottom: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
  background: ${({ theme }) => theme.color.r[300]};
  color: ${({ theme }) => theme.color.g[100]};
  font-size: 24px;
  font-weight: 700;
  transform: translateY(100%);
  animation: ${up} ease-in 300ms 1 forwards;
`;

function TinyToast({ show }: { show: boolean }) {
  const [dot, setDot] = React.useState(".");

  useInterval(
    () =>
      setDot((prev) => {
        const prevLength = prev.length;
        const next = prevLength === 3 ? "." : prev + ".";
        return next;
      }),
    250,
    show
  );

  return show ? (
    <Fixed show={show}>
      <span>loading{dot}</span>
    </Fixed>
  ) : null;
}

export default TinyToast;
