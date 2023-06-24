import React, { useState, useEffect } from 'react';
import styles from './Followers.module.css';
import Layout from '../../components/layout/Layout';
import { AuthContext } from '../../context/AuthContext';
import profileAPI from '../../api/profileAPI';

export default function Followers() {
  const FollowersComponent = () => {
    const [followers, setFollowers] = useState([]);
    const [buttonText, setButtonText] = useState({});
    const [buttonClass, setButtonClass] = useState({});

    useEffect(() => {
      // API 호출하여 팔로워 목록 가져오기
      const fetchFollowers = async () => {
        try {
          const response = await profileAPI.getFollowers();
          setFollowers(response); // 팔로워 목록을 상태로 설정

          // 각 팔로워의 초기 버튼 상태 설정
          const initialButtonText = {};
          const initialButtonClass = {};
          response.forEach(follower => {
            initialButtonText[follower.id] = '팔로우';
            initialButtonClass[follower.id] = styles['followers-btn-follow'];
          });
          setButtonText(initialButtonText);
          setButtonClass(initialButtonClass);
        } catch (error) {
          console.error('Error fetching followers:', error);
        }
      };

      fetchFollowers();
    }, []);

    const updateButtonState = id => {
      setButtonText(prevText => ({
        ...prevText,
        [id]: prevText[id] === '팔로우' ? '취소' : '팔로우',
      }));

      setButtonClass(prevClass => ({
        ...prevClass,
        [id]:
          prevClass[id] === styles['followers-btn-follow']
            ? styles['followers-btn-unfollow']
            : styles['followers-btn-follow'],
      }));
    };

    return (
      <Layout>
        <h2 className="a11y-hidden">팔로워목록</h2>
        <section className={styles['followers-list']}>
          {followers.map(follower => (
            <article key={follower.id} className={styles.followers}>
              <div className={styles['followers-photo']}></div>
              <p
                className={`${styles['followers-inner']} ${styles['followers-name']}`}
              >
                {follower.name}
              </p>
              <p
                className={`${styles['followers-inner']} ${styles['followers-info']}`}
              >
                {follower.info}
              </p>
              <button
                type="button"
                className={`${styles['followers-btn']} ${
                  buttonClass[follower.id]
                }`}
                onClick={() => updateButtonState(follower.id)}
              >
                {buttonText[follower.id]}
              </button>
            </article>
          ))}
        </section>
      </Layout>
    );
  };

  return <FollowersComponent />;
}
