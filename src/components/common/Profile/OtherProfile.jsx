import React, { useEffect, useState } from 'react';
import styles from './OtherProfile.module.css';
import basicProfileImg from '../../../assets/images/basic-profile-img.png';

export default function UserProfile() {
  const token = localStorage.getItem('token');
  const userAccountName = document.location.pathname.replace('/profile/', '');
  const [profileInfo, setProfileInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  console.log(userAccountName);

  useEffect(() => {
    async function fetchProfile() {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.mandarin.weniv.co.kr/profile/${userAccountName}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error('네트워크에 문제가 있습니다!');
        }
        const data = await response.json();
        console.log('다른계정:', data);
        setProfileInfo(data['profile']);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }
    fetchProfile();
  }, []);

  return (
    !isLoading && (
      <section className={styles['user-profile']}>
        <img
          className={styles['user-profile-cover']}
          src={profileInfo['image']}
          alt="프로필 사진"
        />
        <div className={styles['user-profile-info']}>
          <strong className={styles['user-profile-name']}>
            {profileInfo['username']}
          </strong>
          <span className={styles['user-profile-id']}>
            @ {profileInfo['accountname']}
          </span>
          <span className={styles['user-profile-intro']}>
            {profileInfo['intro']}
          </span>
        </div>
        <div className={styles['user-count']}>
          <button type="button" className={styles['btn-followers']}>
            <span className={styles['followers']}>followers</span>
            <span className={styles['followers-number']}>
              {profileInfo['followerCount']}
            </span>
          </button>
          <div className={styles['following-area']}>
            <span className={styles['followings']}>followings</span>
            <span className={styles['followings-number']}>
              {profileInfo['followingCount']}
            </span>
          </div>
        </div>
        <div className={styles['button-container']}>
          <a className={styles['btn-chat']} href="/chat">
            <span className="a11y-hidden">채팅하기</span>
          </a>
          <button className={styles['btn-follow']} type="button">
            팔로우
          </button>
          <div className={styles['btn-share']}>
            <span className="a11y-hidden">공유하기</span>
          </div>
        </div>
      </section>
    )
  );
}
