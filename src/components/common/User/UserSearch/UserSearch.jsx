import React from 'react';
import styles from './UserSearch.module.css';
import { Link } from 'react-router-dom';

function UserListItem({ item, keyword }) {
  return (
    <>
      <Link to={`/profile/${item.accountname}`} className={styles['user-to']}>
        <img
          className={styles['profile-cover']}
          src={item.image}
          alt={`${item.accountname} 프로필`}
        />
        <div className={styles['user-info']}>
          {item.username.includes(keyword) && keyword !== '' ? (
            <strong className={styles['user-name']}>
              {item.username.split(keyword)[0]}
              <span className={styles.keyword}>{keyword}</span>
              {item.username.slice(
                item.username.search(keyword) + keyword.length,
              )}
            </strong>
          ) : (
            <strong className={styles['user-name']}>{item.username}</strong>
          )}
          <span className={styles['user-id']}>@ {item.accountname}</span>
        </div>
      </Link>
    </>
  );
}

export default function UserList({ items, keyword }) {
  const limitedItems = [...items].slice(0, 100);

  return (
    <ul className={styles['user-list']}>
      {limitedItems.map(item => {
        return (
          <li key={item._id} className={styles['user-item']}>
            <UserListItem item={item} keyword={keyword} />
          </li>
        );
      })}
    </ul>
  );
}
