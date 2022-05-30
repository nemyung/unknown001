import * as React from "react";

export type State<T> =
  | {
      status: "idle";
      data: null;
      error: null;
    }
  | {
      status: "loading";
      data: null;
      error: null;
    }
  | {
      status: "fetching";
      data: T;
      error: null;
    }
  | {
      status: "resolved";
      data: T;
      error: null;
    }
  | {
      status: "rejected";
      data: null;
      error: Error;
    };

type Action<T> =
  | {
      type: "loading";
      data: null;
      error: null;
    }
  | {
      type: "fetching";
      data: T;
      error: null;
    }
  | {
      type: "resolved";
      data: T | ((prev: State<T>) => T);
      error: null;
    }
  | {
      type: "rejected";
      data: null;
      error: Error;
    };

function asyncReducer<T>(state: State<T>, action: Action<T>): State<T> {
  const { type } = action;
  switch (type) {
    case "loading": {
      return { status: "loading", data: null, error: null };
    }
    case "fetching": {
      return { ...state, status: "fetching", data: state.data as T, error: null };
    }
    case "resolved": {
      return {
        ...state,
        status: "resolved",
        data: action.data instanceof Function ? action.data(state) : action.data,
        error: null,
      };
    }
    case "rejected": {
      return { ...state, status: "rejected", data: null, error: action.error };
    }
  }
}

function useAsync<T>() {
  const [state, dispatch] = React.useReducer<React.Reducer<State<T>, Action<T>>>(asyncReducer, {
    status: "loading",
    data: null,
    error: null,
  });

  const run = React.useCallback(
    (promise: Promise<T | ((state: State<T>) => T)>, initialize: boolean) => {
      if (initialize) {
        dispatch({ type: "loading", data: null, error: null });
      } else {
        dispatch({ type: "fetching", data: state.data as T, error: null });
      }

      promise
        .then((data) => {
          dispatch({ type: "resolved", data, error: null });
        })
        .catch((error) => {
          dispatch({ type: "rejected", data: null, error: error });
        });
    },
    []
  );

  return { state, run };
}
export default useAsync;
