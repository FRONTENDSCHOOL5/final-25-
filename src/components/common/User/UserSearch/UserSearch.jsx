import React from 'react';
import styles from '.././User.module.css';
import defaultProfileImg from '../../../../assets/images/profile-img42.png';

export default function UserSearch() {
  return (
    <>
      <div className={`${styles['user']} ${styles['user-search']}`}>
        <h2 className="a11y-hidden">사용자 계정</h2>
        <img
          className={styles['profile-cover']}
          src={defaultProfileImg}
          alt="프로필 이미지"
        />
        <div className={styles['user-info']}>
          <h3 className={styles['user-name']}>애월읍 위니브 감귤농장</h3>
          <span className={styles['user-id']}>@ weniv_Mandarin</span>
        </div>
      </div>
      <div className={styles['user']}>
        <h2 className="a11y-hidden">사용자 계정</h2>
        <img
          className={styles['profile-cover']}
          src={defaultProfileImg}
          alt="프로필 이미지"
        />
        <div className={styles['user-info']}>
          <h3 className={styles['user-name']}>애월읍 위니브 감귤농장</h3>
          <span className={styles['user-id']}>@ weniv_Mandarin</span>
        </div>
      </div>
      <div className={styles['user']}>
        <h2 className="a11y-hidden">사용자 계정</h2>
        <img
          className={styles['profile-cover']}
          src={defaultProfileImg}
          alt="프로필 이미지"
        />
        <div className={styles['user-info']}>
          <h3 className={styles['user-name']}>애월읍 위니브 감귤농장</h3>
          <span className={styles['user-id']}>@ weniv_Mandarin</span>
        </div>
      </div>
    </>
  );
}
