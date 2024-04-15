import {
  ChangeEvent,
  FC,
  KeyboardEvent,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import classNames from 'classnames';
import { io } from 'socket.io-client';

import styles from './Chat.module.css';
import { Avatar } from './avatar/Avatar';
import { Message } from './types';

interface ChatProps {
  meetingId: string;
}

const socket = io('http://localhost:3001');

export const Chat: FC<ChatProps> = memo(({ meetingId }) => {
  const [myUserName, setMyUserName] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const joinMeeting = useCallback((): void => {
    socket.emit('joinMeeting', meetingId);
  }, [meetingId]);

  useEffect(() => {
    joinMeeting();
  }, [joinMeeting]);

  useEffect(() => {
    setMyUserName(window.localStorage.getItem('authUserName')!);

    socket.on('message', (data: Message) => {
      setMessages((messages) => [...messages, data]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const handleOpenChat = () => {
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  const handleMessageSubmit = () => {
    if (currentMessage) {
      const data: Message = {
        id: `${myUserName}-${Date.now()}`,
        userName: myUserName,
        meetingId,
        message: currentMessage,
      };
      socket.emit('message', data);
      setCurrentMessage('');
    }
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentMessage(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleMessageSubmit();
    }
  };

  if (!isChatOpen) {
    return (
      <button className={styles.openChatButton} onClick={handleOpenChat}>
        Open chat
      </button>
    );
  }

  return (
    <div className={styles.chatPane}>
      <header className={styles.chatHeader}>
        <button className={styles.closeChatButton} onClick={handleCloseChat}>
          X
        </button>
      </header>
      <main className={styles.chatBody}>
        {messages.map((message) => {
          const isMyMessage = message.userName === myUserName;
          return (
            <article
              key={message.id}
              className={classNames(styles.message, {
                [styles.myMessage]: isMyMessage,
              })}
            >
              {!isMyMessage ? <Avatar name={message.userName} /> : null}{' '}
              {message.message}
            </article>
          );
        })}
      </main>
      <footer className={styles.chatFooter}>
        <input
          type="text"
          onChange={handleInput}
          className={styles.input}
          onKeyDown={handleKeyDown}
          placeholder="Your message goes here"
          value={currentMessage}
        />
        <button className={styles.sendButton} onClick={handleMessageSubmit}>
          Send
        </button>
      </footer>
    </div>
  );
});
