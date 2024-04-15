import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { MeetingReduced } from './types';
import { fetchMeetings } from './utils';

export const Meetings = () => {
  const { data: meetings, isLoading } = useQuery<MeetingReduced[]>(
    'meetings',
    fetchMeetings
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <>
      <h2>Meetings</h2>
      <ul>
        {meetings
          ? meetings.map((meeting) => (
              <li key={meeting.id}>
                <Link to={`meeting/${meeting.id}`}>{meeting.name}</Link>
              </li>
            ))
          : null}
      </ul>
    </>
  );
};
