export type ClubType = "함께 만드는 클럽" | "클럽장 클럽";
export type ClubPlace = "안국" | "강남" | "롯데백화점 잠실점 문화센터" | "온라인";
export type ClubLeader = { name: string };
export type ClubPartner = ClubLeader;
export type ClubMeeting = { order: number; endedAt: string; startedAt: string };
export type ClubMeetings = Array<ClubMeeting>;

export type Club = {
  id: string;
  name: string;
  type: ClubType;
  place: ClubPlace;
  coverUrl: string;
  description: string;
  meetings: ClubMeetings;
};

export type ResponseData = Array<{
  club: Club;
  price: string;
  createdAt: string;
  leaders: Array<ClubLeader>;
  partners: Array<ClubPartner>;
}>;

export type Filter = {
  searchFilter?: [string];
  type?: ClubType[];
  place?: ClubPlace[];
};
