import React from 'react';
import Post from '../Post/Post';
import styles from './ProfilePost.module.css';
import postListOn from '../../../assets/images/icon-post-list-on.svg';
import postAlbumOff from '../../../assets/images/icon-post-album-off.svg';

export default function ProfilePost() {
  let type;
  switch (document.location.pathname) {
    case '/':
      type = 'feed';
      break;
    case '/post':
      type = 'post';
      break;
    default:
      type = 'none';
      break;
  }

  const ProfilePostUI = {
    none: (
      <section className={styles.post}>
        <div className={styles['btn-group']}>
          <button type="button" className={styles['btn-list']}>
            <img src={postListOn} alt="리스트로 보기" />
          </button>
          <button type="button" className={styles['btn-album']}>
            <img src={postAlbumOff} alt="앨범으로 보기" />
          </button>
        </div>
        <ul className={styles['post-list']}>
          <li>
            <Post />
          </li>
        </ul>
      </section>
    ),
    feed: (
      <section className={styles.post}>
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
  };
  return ProfilePostUI[type];
}
