import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './UserProfile.module.css';
import profileAPI from '../../../api/profileAPI';

const token = '';

export default function UserProfile() {
  const [userProfile, setUserProfle] = useState([]);
  const [accountName, setAccountName] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
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
