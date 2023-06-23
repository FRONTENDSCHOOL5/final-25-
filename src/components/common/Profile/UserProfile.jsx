import React from 'react';
import styles from './UserProfile.module.css';
import { useProfileAPI } from '../../../api/profileAPI';

export default function UserProfile() {
  const { profile } = useProfileAPI();
  return (
    <>
      <section className={styles['user-profile']}>
        <img
          className={styles['user-profile-cover']}
          src={profile['image']}
          alt="프로필 사진"
        />
        <div className={styles['user-profile-info']}>
          <strong className={styles['user-profile-name']}>
            {profile['username']}
          </strong>
          <span className={styles['user-profile-id']}>
            @ {profile['accountname']}
          </span>
          <span className={styles['user-profile-intro']}>
            {profile['intro']}
          </span>
        </div>
        <div className={styles['user-count']}>
          <button type="button" className={styles['btn-followers']}>
            <span className={styles['followers']}>followers</span>
            <span className={styles['followers-number']}>
              {profile['followerCount']}
            </span>
          </button>

          <div className={styles['following-area']}>
            <span className={styles['followings']}>followings</span>
            <span className={styles['followings-number']}>
              {profile['followingCount']}
            </span>
          </div>
        </div>
        <div className={styles['button-container']}>
          <a className={styles['btn-modify-profile']} href="/profile/m">
            프로필 수정
          </a>
          <a className={styles['btn-add-product']} href="/product">
            상품 등록
          </a>
        </div>
      </section>
    </>
  );
}
