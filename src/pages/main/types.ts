export type CategoryType = "유형" | "장소";
export type FilterKeys = "searchFilter" | "type" | "place";
export type QueryOption = {
  [K in FilterKeys]?: string[];
};
