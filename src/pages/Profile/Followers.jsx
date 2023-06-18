import React from 'react';
import Header from '../../components/common/Header/Header';
import styles from './Followers.module.css';

export default function Followers() {
  return (
    <>
      <Header />
      <h2 className="a11y-hidden">팔로워목록</h2>
      <main className={styles['followers-list']}>
        <article className={`${styles.followers} ${styles['followers-first']}`}>
          {/* <article className={styles['followers-first']}> */}
          <div className={styles['followers-photo']}></div>
          <p
            className={`${styles['followers-inner']} ${styles['followers-name']}`}
          >
            애월읍 한라봉 최고 맛집
          </p>
          <p
            className={`${styles['followers-inner']} ${styles['followers-info']}`}
          >
            정성을 다해 농사 짓는 한라봉
          </p>
          <button
            type="button"
            className={`${styles['followers-btn']} ${styles['followers-btn-follow']}`}
          >
            팔로우
          </button>
        </article>
        <article className={styles.followers}>
          <div className={styles['followers-photo']}></div>
          <p
            className={`${styles['followers-inner']} ${styles['followers-name']}`}
          >
            감귤의 품격 - 애월읍
          </p>
          <p
            className={`${styles['followers-inner']} ${styles['followers-info']}`}
          >
            제주 노지귤, 하우스 한라봉 판매합니다라마바사아자
          </p>
          <button
            type="button"
            className={`${styles['followers-btn']} ${styles['followers-btn-follow']}`}
          >
            팔로우
          </button>
        </article>
        <article className={styles.followers}>
          <div className={styles['followers-photo']}></div>
          <p
            className={`${styles['followers-inner']} ${styles['followers-name']}`}
          >
            한라봉의 신
          </p>
          <p
            className={`${styles['followers-inner']} ${styles['followers-info']}`}
          >
            30년 노하우로 정성스럽게 농사지은 노지 귤 판매합니다
          </p>
          <button
            type="button"
            className={`${styles['followers-btn']} ${styles['followers-btn-unfollow']}`}
          >
            취소
          </button>
        </article>
      </main>
    </>
  );
}
