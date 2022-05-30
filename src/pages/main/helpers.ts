import { URLSearchParams } from "url";

import type { FilterKeys, QueryOption } from "./types";
import { Filter } from "core/types";

function isQueryKeyVaild(key: string): key is FilterKeys {
  return key === "searchFilter" || key === "type" || key === "place";
}

export function extractURLParams(searchParam: URLSearchParams) {
  const result: QueryOption = {};

  for (const [key, value] of searchParam.entries()) {
    if (!isQueryKeyVaild(key)) {
      continue;
    }
    const existingValue = result[key];

    if (existingValue === undefined) {
      result[key] = [value];
      continue;
    }
    result[key] = [...existingValue, value];
  }

  return result;
}

export function mapQueryOption(searchParam: URLSearchParams) {
  const result: QueryOption = {};

  for (const [key, value] of searchParam.entries()) {
    if (!isQueryKeyVaild(key)) {
      continue;
    }
    const existingValue = result[key];

    if (existingValue === undefined) {
      result[key] = [value];
      continue;
    }
    result[key] = [...existingValue, value];
  }

  return result;
}

export function mergeQueryOption(
  previous: QueryOption,
  { queryKey, value }: { queryKey: FilterKeys; value: string }
): QueryOption {
  const result: QueryOption = Object.assign({}, previous);
  const previousValue = previous[queryKey];

  if (queryKey === "searchFilter") {
    if (value.length === 0) {
      delete result[queryKey];
    } else {
      result[queryKey] = [value];
    }

    return result;
  }

  if (previousValue === undefined) {
    result[queryKey] = [value];
    return result;
  }

  if (previousValue.includes(value)) {
    result[queryKey] = previousValue.filter((f) => f !== value);
    return result;
  }

  result[queryKey] = [...previousValue, value];
  return result;
}

export function getAPIFilterOption(obj: Record<string, string[]>) {
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
