import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styles from './OtherProfile.module.css';
import profileAPI from '../../../api/profileAPI';

const URL = window.location.href;

export default function UserProfile({ alertOpen }) {
  const token = localStorage.getItem('token');
  const accountName = document.location.pathname.replace('/profile/', '');
  const [profileInfo, setProfileInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [isFollow, setIsFollow] = useState(false);
  const url = window.location.href;
  const navigate = useNavigate();

  const fetchProfile = async () => {
    let result;

    try {
      setIsLoading(true);
      result = await profileAPI.getUserProfile(token, accountName);
    } catch (error) {
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
        setIsFollow(false);
        setFollowerCount(prev => followerCount - 1);
        await profileAPI.postUserFollow(
          token,
          accountName,
          '/unfollow',
          'DELETE',
        );
      } catch (error) {
        console.error(error);
        return;
      }
    } else {
      try {
        setIsFollow(true);
        setFollowerCount(prev => followerCount + 1);
        await profileAPI.postUserFollow(token, accountName, '/follow', 'POST');
      } catch (error) {
        console.error(error);
        return;
      }
    }
  };

  const followerClickHandler = () => {
    navigate(`/followers/${accountName}`);
  };
  const followingClickHandler = () => {
    navigate(`/followings/${accountName}`);
  };

  const chatClickHandler = () => {
    navigate(`/chat/${accountName}`);
  };
  const shareClickHandler = () => {
    console.log('공유하기');
    navigator.clipboard.writeText(url);
    alertOpen();
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
          <button
            className={styles['btn-chat']}
            type="button"
            onClick={chatClickHandler}
          >
            <span className="a11y-hidden">채팅하기</span>
          </button>
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

          <CopyToClipboard text={URL} onCopy={shareClickHandler}>
            <button className={styles['btn-share']} type="button">
              <span className="a11y-hidden">공유하기</span>
            </button>
          </CopyToClipboard>
        </div>
      </section>
    )
  );
}
