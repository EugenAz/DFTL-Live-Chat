export type MeetingTime = {
  start: string;
  end: string;
  votes: number;
};

export type Meeting = {
  id: string;
  name: string;
  organizerId: string;
  times: MeetingTime[];
};
