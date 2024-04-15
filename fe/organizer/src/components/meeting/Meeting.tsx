import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import { Chat } from '../chat/Chat';
import { Meeting as MeetingType } from './types';
import { fetchMeeting } from './utils';

import styles from './Meeting.module.css';

export const Meeting = () => {
  const { id } = useParams();

  const { data: meeting, isLoading } = useQuery<MeetingType>({
    queryKey: ['meeting', id],
    queryFn: () => fetchMeeting(id!),
    enabled: Boolean(id),
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return meeting ? (
    <>
      <Link to="/">Back to /</Link>
      <h2>{meeting.name}</h2>
      <ul className={styles.meetingTimes}>
        {meeting.times.map((time) => (
          <li key={time.start + time.end} className={styles.meetingTime}>
            <div>
              Start:
              <input type="text" value={time.start} />
            </div>
            <div>
              End:
              <input type="text" value={time.end} />
            </div>
            <div className={styles.votes}>Votes: {time.votes}</div>
          </li>
        ))}
      </ul>
      {id ? <Chat meetingId={id} /> : null}
    </>
  ) : null;
};
