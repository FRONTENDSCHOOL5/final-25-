import React, { useState } from 'react';
import Post from '../Post/Post';
import styles from './ProfilePost.module.css';
import postListOn from '../../../assets/images/icon-post-list-on.svg';
import postListOff from '../../../assets/images/icon-post-list-off.svg';
import postAlbumOn from '../../../assets/images/icon-post-album-on.svg';
import postAlbumOff from '../../../assets/images/icon-post-album-off.svg';

export default function ProfilePost({ type }) {
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

  const ProfilePostUI = {
    feed: (
      <section className={styles.feed}>
        <ul className={styles['post-list']}>
          <li>
            <Post />
          </li>
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
              <li className={styles['post-album-item']}>
                <img src="https://picsum.photos/200" alt="포스트 썸네일" />
              </li>
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
              <li>
                <Post />
              </li>
            </ul>
          </>
        )}
      </section>
    ),
  };
  return ProfilePostUI[type];
}
