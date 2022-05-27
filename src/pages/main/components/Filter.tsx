import * as React from "react";
import styled from "@emotion/styled";
import { useSearchParams, createSearchParams } from "react-router-dom";

import { nanoid } from "nanoid";

import { Primitive } from "style";

import { extractURLParams, mergeParamsWithCurrentInfo } from "../helpers";

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

const CATEGORIES = ["유형", "장소"] as const;
const FILTERS_BY_CATEGORY = {
  유형: {
    queryKey: "type",
    filterList: ["함께 만드는 클럽", "클럽장 클럽"],
  },
  장소: {
    queryKey: "place",
    filterList: ["안국", "강남", "롯데백화점 잠실점 문화센터", "온라인"],
  },
} as const;

function Filter({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentCategory, setCurrentCategory] = React.useState<"유형" | "장소">("유형");
  const { queryKey, filterList } = FILTERS_BY_CATEGORY[currentCategory];

  const handleCategoryClick = (nextCategory: "유형" | "장소") => () => {
    setIsOpen(true);
    setCurrentCategory(nextCategory);
  };

  const handleFilterClick = (nextFilter: string) => () => {
    const nextSearchParamsInit = mergeParamsWithCurrentInfo(extractURLParams(searchParams), {
      queryKey,
      value: encodeURIComponent(nextFilter),
    });
    const nextSearchParams = createSearchParams(nextSearchParamsInit);
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
          {CATEGORIES.map((category, i) => (
            <li key={nanoid()}>
              <button onClick={handleCategoryClick(category)}>{category}</button>
            </li>
          ))}
        </Category>
        {isOpen && (
          <>
            <Select>
              {filterList.map((filter) => (
                <li key={nanoid()}>
                  <button onClick={handleFilterClick(filter)}>
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
