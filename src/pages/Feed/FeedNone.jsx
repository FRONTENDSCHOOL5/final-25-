import React from 'react';
import { Link } from 'react-router-dom';
import styles from './FeedNone.module.css';

export default function FeedNone() {
  return (
    <>
      <h2 className="a11y-hidden">감귤마켓 피드</h2>
      <div className={styles['feed-none']}>
        <p>유저를 검색해 팔로우 해보세요!</p>
        <Link to="/search" className={styles['btn-search']}>
          검색하기
        </Link>
      </div>
    </>
  );
}
