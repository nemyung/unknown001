import React from "react";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { extractURLParams, mergeParamsWithCurrentInfo } from "../helpers";

const SEARCH_KEY = "searchFilter";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const isEnter = event.key === "Enter";
    const { value } = event.currentTarget;
    if (!isEnter || !value) {
      return;
    }

    const nextSearchParamInit = mergeParamsWithCurrentInfo(extractURLParams(searchParams), {
      queryKey: SEARCH_KEY,
      value: encodeURIComponent(value),
    });
    const nextSearchParams = createSearchParams(nextSearchParamInit);
    setSearchParams(nextSearchParams);
  };

  return <input type="text" onKeyUp={handleKeyUp} />;
}

export default Search;
