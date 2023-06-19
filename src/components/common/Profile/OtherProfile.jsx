import React from 'react';
import styles from './OtherProfile.module.css';
import basicProfileImg from '../../../assets/images/basic-profile-img.png';

export default function UserProfile() {
  return (
    <>
      <section className={styles['user-profile']}>
        <img
          className={styles['user-profile-cover']}
          src={basicProfileImg}
          alt="프로필 사진"
        />
        <div className={styles['user-profile-info']}>
          <strong className={styles['user-profile-name']}>
            이오에서만은 디자인왕
          </strong>
          <span className={styles['user-profile-id']}>@ e5_designKing99</span>
          <span className={styles['user-profile-intro']}>
            애월읍 감귤 전국 배송, 귤따기 체험, 감귤 농장
          </span>
        </div>
        <div className={styles['user-count']}>
          <button type="button" className={styles['btn-followers']}>
            <span className={styles['followers']}>followers</span>
            <span className={styles['followers-number']}>2950</span>
          </button>
          <div className={styles['following-area']}>
            <span className={styles['followings']}>followings</span>
            <span className={styles['followings-number']}>128</span>
          </div>
        </div>
        <div className={styles['button-container']}>
          <a className={styles['btn-chat']} href="/chat">
            <span className="a11y-hidden">채팅하기</span>
          </a>
          <button className={styles['btn-follow']} type="button">
            팔로우
          </button>
          <a className={styles['btn-share']} href="./">
            <span className="a11y-hidden">공유하기</span>
          </a>
        </div>
      </section>
    </>
  );
}
