import React, { useState, useEffect, useContext } from 'react';
import styles from '../Follow.module.css';
import Layout from '../../../components/layout/Layout';
import { AuthContext } from '../../../context/AuthContext';
import { useParams } from 'react-router-dom';
import profileAPI from '../../../api/profileAPI2';
import followAPI from '../../../api/followAPI';

export default function Followers() {
  const [followers, setFollowers] = useState([]);
  const [buttonStates, setButtonStates] = useState([]);
  const { user } = useContext(AuthContext);
  const { accountname } = useParams();

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await profileAPI.getFollowingdata(
          user.token,
          accountname,
        );
        setFollowers(response);
        console.log('response 데이터 확인:', response);

        // 각 팔로워의 초기 버튼 상태 설정
        const initialButtonStates = new Array(response.length).fill({
          text: '취소',
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

  // 삭제 되면 콘솔에는 찍히는데
  // useEffect(() => {
  //   console.log('Followers state updated:', followers);
  // }, [followers]);

  // 언팔로잉 api연결
  const getUnfollowUser = async followerId => {
    console.log('언팔 확인중', followerId);

    try {
      await followAPI.unfollowingPost(user.token, accountname);
      console.log('확인');

      // setFollowers(prevFollowers =>
      //   prevFollowers.filter(follower => follower._id !== followerId),
      // );

      //api 리스트를 다시 불러온다.
      console.log('set 확인중', followers);
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  // const updateButtonState = index => {
  //   setButtonStates(prevStates => {
  //     const updatedStates = [...prevStates];
  //     updatedStates[index] = {
  //       text: prevStates[index].text === '취소' ? '팔로우' : '취소',
  //       className:
  //         prevStates[index].className === styles['followers-btn-unfollow']
  //           ? styles['followers-btn-follow']
  //           : styles['followers-btn-unfollow'],
  //     };
  //     return updatedStates;
  //   });
  // };

  const updateButtonState = async (index, followerId) => {
    if (buttonStates[index]?.text === '취소') {
      console.log('버튼 누르면 이벤트 값이 넘어와지는 확인중', followerId);
      await getUnfollowUser(followerId);
    }

    setButtonStates(prevStates => {
      const updatedStates = [...prevStates];
      updatedStates[index] = {
        text: prevStates[index].text === '취소' ? '팔로우' : '취소',
        className:
          prevStates[index].className === styles['followers-btn-unfollow']
            ? styles['followers-btn-follow']
            : styles['followers-btn-unfollow'],
      };
      return updatedStates;
    });
  };

  return (
    <Layout>
      <h2 className="a11y-hidden">팔로워 목록</h2>
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
                  />
                )}
              </div>
              <p
                className={`${styles['followers-inner']} ${styles['followers-name']}`}
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
                  onClick={() => updateButtonState(index, follower._id)}
                >
                  {buttonStates[index]?.text}
                </button>
              )}
            </article>
          ))
        ) : (
          <p>No followers found.</p>
        )}
      </section>
    </Layout>
  );
}
