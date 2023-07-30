import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../Follow.module.css';
import Layout from '../../../components/layout/Layout';
import { AuthContext } from '../../../context/AuthContext';
import profileAPI from '../../../api/profileAPI2';

export default function Followings() {
  const [followers, setFollowers] = useState([]);
  const [buttonStates, setButtonStates] = useState([]);
  const { user } = useContext(AuthContext);
  const { accountname } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await profileAPI.getFollowerList(
          user.token,
          accountname,
        );
        setFollowers(response);
        console.log('response 데이터 확인:', response);

        // 각 팔로워의 초기 버튼 상태 설정, api 하게 되면 필요없는 코드가 될수 있음
        const initialButtonStates = new Array(response.length).fill({
          text: '삭제',
          className: styles['followers-btn-unfollow'],
        });
        setButtonStates(initialButtonStates);
      } catch (error) {
        console.error('Error fetching followers:', error);
      }
    };

    if (followers.length === 0) {
      fetchFollowers();
    }
  }, [followers.length, accountname, user.token]);

  console.log('Followers 데이터 확인:', followers);

  //팔로우 삭제 버튼 들어갈 텍스트 값을 구분해주면
  const updateButtonState = index => {
    setButtonStates(prevStates => {
      const updatedStates = [...prevStates];
      updatedStates[index] = {
        text: prevStates[index].text === '팔로우' ? '삭제' : '팔로우',
        className:
          prevStates[index].className === styles['followers-btn-follow']
            ? styles['followers-btn-unfollow']
            : styles['followers-btn-follow'],
      };
      return updatedStates;
    });
  };

  return (
    <Layout>
      <h2 className="a11y-hidden">팔로잉 목록</h2>
      <section className={styles['followers-list']}>
        {followers.length > 0 ? (
          followers.map((follower, index) => (
            <article
              key={index}
              index={index}
              data={follower}
              className={styles.followers}
            >
              <div className={styles['followers-photo']}>
                {!follower.image && (
                  <div className={styles['followers-photo-bg']} />
                )}
                {follower.image && (
                  <img
                    src={follower.image}
                    alt="프로필 사진"
                    className={styles['followers-photo-img']}
                    onClick={() => navigate(`/profile/${follower.accountname}`)}
                  />
                )}
              </div>
              <p
                className={`${styles['followers-inner']} ${styles['followers-name']}`}
                onClick={() => navigate(`/profile/${follower.accountname}`)}
              >
                {follower.username}
              </p>
              <p
                className={`${styles['followers-inner']} ${styles['followers-info']}`}
              >
                {follower.intro}
              </p>
              {follower.accountname !== user.accountname && (
                <button
                  type="button"
                  id={`btn-${index}`}
                  className={`${styles['followers-btn']} ${buttonStates[index]?.className}`}
                  onClick={() => updateButtonState(index)}
                >
                  {buttonStates[index]?.text}
                </button>
              )}
            </article>
          ))
        ) : (
          <p>No followings found.</p>
        )}
      </section>
    </Layout>
  );
}
