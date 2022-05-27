import { URLSearchParams } from "url";

import type { Filter } from "../../core/types";
export type ConvertedURLSearchParams = Record<string, string[]>;

export function extractURLParams(searchParam: URLSearchParams) {
  const result = {} as ConvertedURLSearchParams;
  for (const [key, value] of searchParam.entries()) {
    if (result[key]) {
      if (key === "searchFilter") {
        continue;
      }
      result[key] = [...result[key], value];
    } else {
      result[key] = [value];
    }
  }
  return result;
}

export function mergeParamsWithCurrentInfo(
  previous: ConvertedURLSearchParams,
  { queryKey, value }: { queryKey: "searchFilter" | "place" | "type"; value: string }
): ConvertedURLSearchParams {
  const result = Object.assign({}, previous);

  if (previous[queryKey] === undefined) {
    result[queryKey] = [value];
  } else if (previous[queryKey].includes(value)) {
    result[queryKey] =
      queryKey === "searchFilter"
        ? previous[queryKey]
        : previous[queryKey].filter((f) => f !== value);
  } else {
    result[queryKey] = queryKey === "searchFilter" ? [value] : [...previous[queryKey], value];
  }

  return result;
}

export function getAPIFilterOption(obj: ConvertedURLSearchParams) {
  return Object.entries(obj).reduce((acc, [key, values]): Filter => {
    if (["searchFilter", "type", "place"].includes(key)) {
      return {
        ...acc,
        [key]: values.map((value) => decodeURIComponent(value)),
      };
    }
    return acc;
  }, {});
}

export function calculateStartDay(s: string) {
  const ymd = s.split("T")[0];
  const [_, m, d] = ymd.split("-");

  return `${m}월 ${d}일`;
}
