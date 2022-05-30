import * as React from "react";
import styled from "@emotion/styled";
import { useSearchParams, createSearchParams } from "react-router-dom";

import { nanoid } from "nanoid";

import { Primitive } from "style";

import { mapQueryOption, mergeQueryOption } from "../helpers";

import { FILTERS_BY_CATEGORY, CATEGORIES } from "../constants";

import type { CategoryType } from "../types";

const Sticky = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Category = styled(Primitive.UL)`
  display: flex;
  & > li {
    flex-basis: 50%;
    background-color: ${({ theme }) => theme.color.r[300]};
    height: 60px;

    & button {
      width: 100%;
      height: 100%;
      color: ${({ theme }) => theme.color.g[100]};
      text-align: center;
      font-size: ${({ theme }) => `${theme.fontSize[200]}px`};
      font-weight: bold;
      background: none;
      border: none;
    }
  }
`;

const Select = styled(Primitive.UL)`
  width: 100%;
  & > li {
    width: 100%;
    height: 40px;
  }
  & li:last-child {
    & button {
      background-color: ${({ theme }) => theme.color.r[100]};
    }
  }

  & button {
    width: 100%;
    height: 100%;
    text-align: center;
    color: #f0f0f0;
    font-size: ${({ theme }) => `${theme.fontSize[100]}px`};
    font-weight: bold;
    background: none;
    border: none;
    background-color: ${({ theme }) => theme.color.r[200]};
  }
`;

function Filter({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentCategory, setCurrentCategory] = React.useState<CategoryType>("유형");
  const { queryKey, filterList } = FILTERS_BY_CATEGORY[currentCategory];

  const handleCategoryClick = (nextCategory: CategoryType) => () => {
    setIsOpen(true);
    setCurrentCategory(nextCategory);
  };

  const handleFilterClick = (nextFilter: string) => () => {
    const currentQueryOption = mapQueryOption(searchParams);
    const selectedQueryOption = { queryKey, value: encodeURIComponent(nextFilter) };
    const nextQueryOption = mergeQueryOption(currentQueryOption, selectedQueryOption);
    const nextSearchParams = createSearchParams(nextQueryOption);
    setSearchParams(nextSearchParams);
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Primitive.Section>
      <Sticky>
        <Category>
          {CATEGORIES.map((category) => (
            <li key={nanoid()}>
              <button aria-label={`${category} 카테고리`} onClick={handleCategoryClick(category)}>
                {category}
              </button>
            </li>
          ))}
        </Category>
        {isOpen && (
          <>
            <Select>
              {filterList.map((filter) => (
                <li key={nanoid()}>
                  <button
                    aria-label={`${currentCategory}의 ${filter}`}
                    onClick={handleFilterClick(filter)}
                  >
                    <span>{filter}</span>
                  </button>
                </li>
              ))}
              <li>
                <button onClick={handleClose}>닫기</button>
              </li>
            </Select>
          </>
        )}
      </Sticky>
      {children}
    </Primitive.Section>
  );
}

export default Filter;
