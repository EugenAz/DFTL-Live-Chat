import { FC } from 'react';

import styles from './Avatar.module.css';

interface AvatarProps {
  name: string;
}

export const Avatar: FC<AvatarProps> = ({ name }) => {
  return (
    <span className={styles.avatar}>
      <strong>{name}</strong>:
    </span>
  );
};
