import React from 'react';
import styles from './UserSearch.module.css';
import { Link } from 'react-router-dom';

export default function UserSearch({ key, data, keyword }) {
  const rawUserName = data.username;

  return (
    <>
      <Link to={`/profile/${data.accountname}`} className={styles['user-to']}>
        <img
          className={styles['profile-cover']}
          src={data.image}
          alt={`${data.accountname} 프로필`}
        />
        <div className={styles['user-info']}>
          {rawUserName.includes(keyword) ? (
            <strong className={styles['user-name']}>
              {rawUserName.split(keyword)[0]}
              <span className={styles.keyword}>{keyword}</span>
              {rawUserName.slice(rawUserName.search(keyword) + keyword.length)}
            </strong>
          ) : (
            <strong className={styles['user-name']}>{rawUserName}</strong>
          )}
          <span className={styles['user-id']}>@ {data.accountname}</span>
        </div>
      </Link>
    </>
  );
}
