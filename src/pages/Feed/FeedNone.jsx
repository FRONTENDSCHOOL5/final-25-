import React from 'react';
import Layout from '../../components/layout/Layout';
import styles from './FeedNone.module.css';

export default function FeedNone() {
  return (
    <>
      <Layout>
        <h2 className="a11y-hidden">감귤마켓 피드</h2>
        <div className={styles['feed-none']}>
          <p>유저를 검색해 팔로우 해보세요!</p>
          <a href="/search" className={styles['btn-search']}>
            검색하기
          </a>
        </div>
        <div className={styles.feed}></div>
      </Layout>
    </>
  );
}
