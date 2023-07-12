import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './OtherProfile.module.css';
import profileAPI from '../../../api/profileAPI';

export default function UserProfile() {
  const token = localStorage.getItem('token');
  const accountName = document.location.pathname.replace('/profile/', '');
  const [profileInfo, setProfileInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);
  const [followerCount, setFollowerCount] = useState(0);
  const [isFollow, setIsFollow] = useState(false);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    let result;

    try {
      setIsLoading(true);
      setLoadingError(null);
      result = await profileAPI.getUserProfile(token, accountName);
    } catch (error) {
      setLoadingError(error);
      console.error(error);
      return;
    } finally {
      setIsLoading(false);
    }

    setProfileInfo(result.profile);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    console.log('jjj', profileInfo);

    setFollowerCount(profileInfo['followerCount']);
    setIsFollow(profileInfo['isfollow']);
  }, [profileInfo]);

  const followHandler = async () => {
    if (isFollow) {
      try {
        setIsLoading(true);
        setLoadingError(null);
        setIsFollow(false);
        setFollowerCount(prev => followerCount - 1);
        await profileAPI.postUserFollow(
          token,
          accountName,
          '/unfollow',
          'DELETE',
        );
      } catch (error) {
        setLoadingError(error);
        console.error(error);
        return;
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        setIsLoading(true);
        setLoadingError(null);
        setIsFollow(true);
        setFollowerCount(prev => followerCount + 1);
        await profileAPI.postUserFollow(token, accountName, '/follow', 'POST');
      } catch (error) {
        setLoadingError(error);
        console.error(error);
        return;
      } finally {
        setIsLoading(false);
      }
    }
  };

  const followerClickHandler = () => {
    navigate(`/followers/${accountName}`);
  };
  const followingClickHandler = () => {
    navigate(`/followings/${accountName}`);
  };

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
          <button
            type="button"
            className={styles['btn-followers']}
            onClick={followerClickHandler}
          >
            <span className={styles['followers']}>followers</span>
            <span className={styles['followers-number']}>{followerCount}</span>
          </button>
          <button
            className={styles['following-area']}
            onClick={followingClickHandler}
          >
            <span className={styles['followings']}>followings</span>
            <span className={styles['followings-number']}>
              {profileInfo['followingCount']}
            </span>
          </button>
        </div>
        <div className={styles['button-container']}>
          <a className={styles['btn-chat']} href="/chat">
            <span className="a11y-hidden">채팅하기</span>
          </a>
          {isFollow ? (
            <button
              className={styles['btn-unfollow']}
              type="button"
              onClick={followHandler}
            >
              언팔로우
            </button>
          ) : (
            <button
              className={styles['btn-follow']}
              type="button"
              onClick={followHandler}
            >
              팔로우
            </button>
          )}

          <div className={styles['btn-share']}>
            <span className="a11y-hidden">공유하기</span>
          </div>
        </div>
      </section>
    )
  );
}
