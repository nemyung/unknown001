export type ClubType = "함께 만드는 클럽" | "클럽장 클럽";
export type ClubPlace = "안국" | "강남" | "롯데백화점 잠실점 문화센터" | "온라인";
export type ClubLeader = { name: string };
export type ClubPartner = ClubLeader;

export type Club = {
  id: string;
  name: string;
  type: ClubType;
  place: ClubPlace;
  coverUrl: string;
  description: string;
  price: string;
  createdAt: string;
  leaders: Array<ClubLeader>;
  partners: Array<ClubPartner>;
};

export type ResponseData = Array<{ club: Club }>;

export type Filter = {
  searchKeyword: string | null;
  type: ClubType | null;
  place: ClubPlace | null;
};
