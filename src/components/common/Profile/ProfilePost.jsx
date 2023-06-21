import React, { useEffect, useState } from 'react';
import Post from '../Post/Post';
import styles from './ProfilePost.module.css';
import postListOn from '../../../assets/images/icon-post-list-on.svg';
import postListOff from '../../../assets/images/icon-post-list-off.svg';
import postAlbumOn from '../../../assets/images/icon-post-album-on.svg';
import postAlbumOff from '../../../assets/images/icon-post-album-off.svg';

import { useFeedAPI } from '../../../api/feedAPI';

export default function ProfilePost({ type }) {
  const { post } = useFeedAPI();

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

  // 게시글 목록 API: 'https://api.mandarin.weniv.co.kr/post/:accountname/userpost'
  const [myPost, setMyPost] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const url = 'https://api.mandarin.weniv.co.kr';
  useEffect(() => {
    async function fetchMyPost() {
      setIsLoading(true);
      try {
        const response = await fetch(url + '/post/sunbin5/userpost', {
          method: 'GET',
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OGZhNjExYjJjYjIwNTY2MzNhNzUxZCIsImV4cCI6MTY5MjM1NDE4NywiaWF0IjoxNjg3MTcwMTg3fQ.MiyMMGRaddraLYS_d-o-LwaSVduR4MacYWqjUL5SFFA',
          },
        });

        if (!response.ok) {
          throw new Error('네트워크에 문제가 있습니다!');
        }
        const data = await response.json();
        setMyPost(data['post']);
        setIsLoading(false);
        console.log('내 포스트', data);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }
    fetchMyPost();
  }, []);

  const postImgArray = [];
  myPost.forEach(element => {
    // console.log(element);
    element['image'] !== ''
      ? postImgArray.push(element['image'])
      : console.log('이미지 없어유');
  });
  // console.log(postImgArray);

  const ProfilePostUI = {
    feed: (
      <section className={styles.feed}>
        <ul className={styles['post-list']}>
          {post.map(item => {
            return (
              <li>
                <Post data={item} />
              </li>
            );
          })}
        </ul>
      </section>
    ),
    post: (
      <section className={styles.post}>
        <Post />
      </section>
    ),
    profile: (
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
              {postImgArray.map(item => {
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
              {myPost.map(item => {
                return (
                  <li>
                    <Post data={item} />
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
