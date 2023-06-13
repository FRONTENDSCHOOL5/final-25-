import React from 'react';
import styles from './Followers.module.css';

export default function Followers() {
  return (
    <>
      {/** 종미님 헤더 연결하면 아래의 <header>지우기</header>*/}
      <header className={styles['header-followers']}>Followers</header>
      <div className={styles.followers}>
        <div className={styles['followers-photo']}></div>
        {/* <div className={styles['followers-inner']}> */}
        <div
          className={`${styles['followers-inner']} ${styles['followers-name']}`}
        >
          애월읍 한라봉 최고 맛집
        </div>
        <div
          className={`${styles['followers-inner']} ${styles['followers-info']}`}
        >
          정성을 다해 농사 짓는 한라봉
        </div>
        <button type="button" className={styles['followers-btn-follow']}>
          팔로우
        </button>
      </div>
      <div className={styles.followers}>
        <div className={styles['followers-photo']}></div>
        <div
          className={`${styles['followers-inner']} ${styles['followers-name']}`}
        >
          감귤의 품격 - 애월읍
        </div>
        <div className={styles['followers-inner']}>
          <div
            className={`${styles['followers-inner']} ${styles['followers-info']}`}
          >
            제주 노지귤, 하우스 한라봉 판매합니다라마바사아자
          </div>
        </div>
        <button type="button" className={styles['followers-btn-follow']}>
          팔로우
        </button>
      </div>
      <div className={styles.followers}>
        <div className={styles['followers-photo']}></div>
        <div
          className={`${styles['followers-inner']} ${styles['followers-name']}`}
        >
          한라봉의 신
        </div>
        <div className={styles['followers-inner']}>
          <div
            className={`${styles['followers-inner']} ${styles['followers-info']}`}
          >
            30년 노하우로 정성스럽게 농사지은 노지 귤 판매합니다
          </div>
        </div>
        <button type="button" className={styles['followers-btn-unfollow']}>
          취소
        </button>
      </div>
    </>
  );
}
