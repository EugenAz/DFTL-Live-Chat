import { MeetingReduced } from './types';

export const fetchMeetings = async (): Promise<MeetingReduced[]> => {
  const response = await fetch('http://localhost:3000/meeting');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
