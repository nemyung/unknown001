import * as React from "react";
import styled from "@emotion/styled";
import { createSearchParams, useSearchParams } from "react-router-dom";

import { Primitive } from "../../../style";

import { extractURLParams, mergeParamsWithCurrentInfo } from "../helpers";

const SearchInput = styled.input`
  display: inline-block;
  width: 100%;
  max-width: 768px;
  height: 32px;
  margin: 16px 0px;
  padding: 0px 12px;
  font-weight: bold;
  border-radius: 10px;
  border: 1px solid black;

  @media (min-width: 768px) {
    display: block;
    height: 70px;
    padding: 0px 36px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 48.5px;
    font-size: 32px;
  }
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
