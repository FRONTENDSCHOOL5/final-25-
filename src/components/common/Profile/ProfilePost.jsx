import React, { useEffect, useState } from 'react';
import Post from '../Post/Post';
import styles from './ProfilePost.module.css';
import postAPI from '../../../api/postAPI';
import FeedNone from '../../../pages/Feed/FeedNone';
import postListOn from '../../../assets/images/icon-post-list-on.svg';
import postListOff from '../../../assets/images/icon-post-list-off.svg';
import postAlbumOn from '../../../assets/images/icon-post-album-on.svg';
import postAlbumOff from '../../../assets/images/icon-post-album-off.svg';

export default function ProfilePost({
  type,
  postDetailId,
  modalOpen,
  getPostId,
}) {
  const token = localStorage.getItem('token');
  const pathName = document.location.pathname;
  const userAccountName = pathName.includes('/profile/')
    ? document.location.pathname.replace('/profile/', '')
    : localStorage.getItem('accountname');

  console.log(type, userAccountName);

  // false가 리스트로 보기
  // true가 앨범으로 보기
  const [option, setOption] = useState('리스트로 보기');
  const [isOptionClicked, setIsOptionClicked] = useState(false);
  const optionHandler = event => {
    if (event.target.alt !== option) {
      if (event.target.alt === '앨범으로 보기') {
        setOption('앨범으로 보기');
        setIsOptionClicked(true);
      } else {
        setOption('리스트로 보기');
        setIsOptionClicked(false);
      }
    }
  };

  // 유저 게시글 목록
  const [accountName, setAccountName] = useState(userAccountName);
  const [postId, setPostDetailId] = useState(postDetailId);
  const [feedList, setFeedList] = useState([]);
  const [postDetail, setPostDetail] = useState();
  const [userPost, setUserPost] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeed = async () => {
      const data = await postAPI.getFeed(token);
      // setIsLoading(false);
      console.log(data);
      setFeedList(data['posts']);
    };

    const fetchPostDetail = async () => {
      const data = await postAPI.getPostDetail(token, postId);
      setPostDetail(data['post']);
    };

    const fetchUserPost = async () => {
      const data = await postAPI.getUserpost(token, accountName);
      setIsLoading(false);
      setUserPost(data['post']);
    };

    switch (type) {
      case 'feed':
        fetchFeed();
        break;
      case 'post':
        fetchPostDetail();
        break;
      case 'profile':
        fetchUserPost();
        break;
      default:
        break;
    }
  }, [type]);

  const userPostImgArray = [];
  userPost.map(item => {
    item['image']
      ? userPostImgArray.push(item['image'])
      : console.log('이미지 없어유');
  });

  const ProfilePostUI = {
    feed:
      feedList.length === 0 ? (
        <FeedNone />
      ) : (
        <section className={styles.feed}>
          <ul className={styles['post-list']}>
            {feedList.map(item => {
              return (
                <li key={item.id}>
                  <Post
                    data={item}
                    account={accountName}
                    modalOpen={modalOpen}
                    getPostId={getPostId}
                  />
                </li>
              );
            })}
          </ul>
        </section>
      ),
    post: (
      <section className={styles.post}>
        {postDetail && accountName ? (
          <Post
            data={postDetail}
            accountName={accountName}
            modalOpen={modalOpen}
            getPostId={getPostId}
          />
        ) : (
          '로딩중'
        )}
      </section>
    ),
    profile:
      userPost.length === 0 ? (
        <></>
      ) : (
        <section className={styles.profile}>
          {isOptionClicked ? (
            <>
              <div className={styles['btn-group']}>
                <button
                  type="button"
                  className={styles['btn-list']}
                  onClick={optionHandler}
                >
                  <img src={postListOff} alt="리스트로 보기" />
                </button>
                <button
                  type="button"
                  className={styles['btn-album']}
                  onClick={optionHandler}
                >
                  <img src={postAlbumOn} alt="앨범으로 보기" />
                </button>
              </div>
              <ul className={styles['post-album']}>
                {userPostImgArray.map(item => {
                  return (
                    <li className={styles['post-album-item']}>
                      <img src={item} alt="포스트 썸네일" />
                    </li>
                  );
                })}
              </ul>
            </>
          ) : (
            <>
              <div className={styles['btn-group']}>
                <button
                  type="button"
                  className={styles['btn-list']}
                  onClick={optionHandler}
                >
                  <img src={postListOn} alt="리스트로 보기" />
                </button>
                <button
                  type="button"
                  className={styles['btn-album']}
                  onClick={optionHandler}
                >
                  <img src={postAlbumOff} alt="앨범으로 보기" />
                </button>
              </div>
              <ul className={styles['post-list']}>
                {userPost.map(item => {
                  return (
                    <li key={item.id}>
                      <Post
                        data={item}
                        accountName={accountName}
                        modalOpen={modalOpen}
                        getPostId={getPostId}
                      />
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </section>
      ),
  };
  return ProfilePostUI[type];
}
