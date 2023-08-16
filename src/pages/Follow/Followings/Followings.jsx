import React, { useState, useEffect, useContext } from 'react';
import styles from '../Follow.module.css';
import Layout from '../../../components/layout/Layout';
import { AuthContext } from '../../../context/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';
import profileAPI from '../../../api/profileAPI2';
import followAPI from '../../../api/followAPI';

export default function Followers() {
  const [followers, setFollowers] = useState([]);
  const [buttonStates, setButtonStates] = useState([]);
  const { user } = useContext(AuthContext);
  const { accountname } = useParams();
  const navigate = useNavigate();

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
  }, [followers, accountname, user.token]);

  // 언팔로잉 api연결
  const getUnfollowUser = async (followerId, selectedFollower) => {
    console.log('언팔 확인중', followerId);

    try {
      const result = await followAPI.unfollowingPost(
        user.token,
        selectedFollower.accountname,
      );
      console.log('언팔 결과', result);
      console.log('확인');

      setFollowers(prevFollowers =>
        prevFollowers.filter(follower => follower._id !== followerId),
      );

      //api 리스트를 다시 불러온다.
      console.log('set 확인중', followers);
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  const updateButtonState = async (index, followerId) => {
    // id 뽑아내기 계정가져오는중
    const selectedFollower = followers.find(
      follower => follower._id === followerId,
    );
    console.log('선택한 구독자 정보: ', selectedFollower);

    if (selectedFollower.accountname === user.accountname) {
      if (buttonStates[index]?.text === '취소') {
        console.log('버튼 누르면 이벤트 값이 넘어와지는 확인중', followerId);
        await getUnfollowUser(followerId, selectedFollower);
      }

      //팔로우 취소 버튼
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
    }
  };

  return (
    <Layout>
      <h2 className="a11y-hidden">팔로워 목록</h2>
      <ul className={styles['followers-list']}>
        {followers.length > 0 ? (
          followers.map((follower, index) => (
            <li key={follower._id}>
              <article
                // 키값은 id로 주는게 좋고
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
                      onClick={() =>
                        navigate(`/profile/${follower.accountname}`)
                      }
                    ></img>
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
                    onClick={() => updateButtonState(index, follower._id)}
                  >
                    {buttonStates[index]?.text}
                  </button>
                )}
              </article>
            </li>
          ))
        ) : (
          <p>No followers found.</p>
        )}
      </ul>
    </Layout>
  );
}
