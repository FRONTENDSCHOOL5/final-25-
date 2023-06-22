import React, { useEffect, useState } from 'react';
import styles from './UserProfile.module.css';
import profileAPI from '../../../api/profileAPI';
import { useNavigate } from 'react-router-dom';

export default function UserProfile() {
  const [userProfile, setUserProfle] = useState([]);
  const [accountName, setAccountName] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // const token =
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OGZhNjExYjJjYjIwNTY2MzNhNzUxZCIsImV4cCI6MTY5MjMyNjM4MiwiaWF0IjoxNjg3MTQyMzgyfQ.CPlbun9R6RlVAG-yAkfiLusCqVqrbYyw5iAf3hjGksg';
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OTAyZTE3YjJjYjIwNTY2MzNjODFlZSIsImV4cCI6MTY5MjM1NTA3NCwiaWF0IjoxNjg3MTcxMDc0fQ.PMMMcwMQ0vb7dPv4xYZikUs6yKLUJ1oCBRtVLc0us30';

    const fetchMyProfile = async () => {
      const data = await profileAPI.getMyProfile(token);
      setUserProfle(data['user']);
      setAccountName(data['user']['accountname']);
    };
    fetchMyProfile();
  }, []);

  const followerClickHandler = event => {
    console.log(event);
    navigate(`/followers/${accountName}`);
  };

  return (
    <>
      <section className={styles['user-profile']}>
        <img
          className={styles['user-profile-cover']}
          src={userProfile['image']}
          alt="프로필 사진"
        />
        <div className={styles['user-profile-info']}>
          <strong className={styles['user-profile-name']}>
            {userProfile['username']}
          </strong>
          <span className={styles['user-profile-id']}>
            @ {userProfile['accountname']}
          </span>
          <span className={styles['user-profile-intro']}>
            {userProfile['intro']}
          </span>
        </div>
        <div className={styles['user-count']}>
          <button
            type="button"
            className={styles['btn-followers']}
            onClick={followerClickHandler}
          >
            <span className={styles['followers']}>followers</span>
            <span className={styles['followers-number']}>
              {userProfile['followerCount']}
            </span>
          </button>

          <button className={styles['following-area']}>
            <span className={styles['followings']}>followings</span>
            <span className={styles['followings-number']}>
              {userProfile['followingCount']}
            </span>
          </button>
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
