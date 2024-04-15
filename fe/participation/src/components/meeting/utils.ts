import { Meeting } from './types';

export const fetchMeeting = async (id: string): Promise<Meeting> => {
  const response = await fetch(`http://localhost:3000/meeting/${id}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
