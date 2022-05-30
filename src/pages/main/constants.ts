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

export { CATEGORIES, FILTERS_BY_CATEGORY };
