import * as React from "react";
import { nanoid } from "nanoid";
import { useSearchParams, createSearchParams } from "react-router-dom";
import { extractURLParams, mergeParamsWithCurrentInfo } from "../helpers";

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

function Filter() {
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
  };

  return (
    <section>
      <ul style={{ listStyle: "none", display: "flex", padding: 0, width: "100%" }}>
        {CATEGORIES.map((category, i) => (
          <li style={{ marginRight: i === 0 ? "1rem" : "", flex: "0 0 50%" }} key={nanoid()}>
            <button onClick={handleCategoryClick(category)}>{category}</button>
          </li>
        ))}
      </ul>
      {isOpen && (
        <ul style={{ listStyle: "none", display: "flex", padding: 0, width: "100%" }}>
          {filterList.map((filter) => (
            <li key={nanoid()}>
              <button onClick={handleFilterClick(filter)}>{filter}</button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Filter;
