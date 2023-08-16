import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './UserProfile.module.css';
import profileAPI from '../../../api/profileAPI';

export default function UserProfile({ token }) {
  const [userProfile, setUserProfile] = useState([]);
  const [accountName, setAccountName] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyProfile();
  }, []);

  const fetchMyProfile = async () => {
    try {
      setIsLoading(true);
      setLoadingError(null);

      const data = await profileAPI.getMyProfile(token);
      setUserProfile(data['user']);
      setAccountName(data['user']['accountname']);
    } catch (error) {
      setLoadingError(error);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const followerClickHandler = event => {
    console.log(event);
    navigate(`/followers/${accountName}`);
  };
  const followingClickHandler = event => {
    console.log(event);
    navigate(`/followings/${accountName}`);
  };

  return (
    !isLoading && (
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

          <button
            className={styles['following-area']}
            onClick={followingClickHandler}
          >
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
    )
  );
}
