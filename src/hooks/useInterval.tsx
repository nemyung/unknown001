import * as React from "react";

function useInterval<C extends (...args: unknown[]) => void>(cb: C, delay: number, start: boolean) {
  const cbRef = React.useRef<C>(cb);
  React.useEffect(() => {
    cbRef.current = cb;
  });

  React.useEffect(() => {
    if (!start) {
      return;
    }
    const id = setInterval(() => cbRef.current(), delay);
    return () => {
      clearInterval(id);
    };
  }, [delay, start]);
}

export default useInterval;
