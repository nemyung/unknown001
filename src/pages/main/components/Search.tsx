import * as React from "react";
import styled from "@emotion/styled";
import { createSearchParams, useSearchParams } from "react-router-dom";

import { Primitive } from "../../../style";

import { extractURLParams, mergeParamsWithCurrentInfo } from "../helpers";

const SearchInput = styled.input`
  display: inline-block;
  width: 100%;
  height: 32px;
  margin: 16px 0px;
  padding: 0px 12px;
  font-weight: bold;
  border-radius: 10px;
  border: 1px solid black;
`;

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

  return (
    <Primitive.PaddingDiv>
      <SearchInput type="text" onKeyUp={handleKeyUp} />
    </Primitive.PaddingDiv>
  );
}

export default Search;
