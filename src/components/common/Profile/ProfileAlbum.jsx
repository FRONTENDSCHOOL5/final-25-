import React from 'react';
import styles from './ProfileAlbum.module.css';
import postListOn from '../../../assets/images/icon-post-list-on.svg';
import postAlbumOff from '../../../assets/images/icon-post-album-off.svg';

export default function ProfileAlbum() {
  return (
    <>
      <div className={styles['btn-group']}>
        <button type="button" className={styles['btn-list']}>
          <img src={postListOn} alt="리스트로 보기" />
        </button>
        <button type="button" className={styles['btn-album']}>
          <img src={postAlbumOff} alt="앨범으로 보기" />
        </button>
      </div>
      <ul className={styles['post-album']}>
        <li className={styles['post-album-item']}>
          <img src="https://picsum.photos/200" alt="포스트 썸네일" />
        </li>
        <li className={styles['post-album-item']}>
          <img src="https://picsum.photos/200" alt="포스트 썸네일" />
        </li>
        <li className={styles['post-album-item']}>
          <img src="https://picsum.photos/200" alt="포스트 썸네일" />
        </li>
        <li className={styles['post-album-item']}>
          <img src="https://picsum.photos/200" alt="포스트 썸네일" />
        </li>
        <li className={styles['post-album-item']}>
          <img src="https://picsum.photos/200" alt="포스트 썸네일" />
        </li>
        <li className={styles['post-album-item']}>
          <img src="https://picsum.photos/200" alt="포스트 썸네일" />
        </li>
        <li className={styles['post-album-item']}>
          <img src="https://picsum.photos/200" alt="포스트 썸네일" />
        </li>

        <li className={styles['post-album-item']}>
          <img src="https://picsum.photos/200" alt="포스트 썸네일" />
        </li>

        <li className={styles['post-album-item']}>
          <img src="https://picsum.photos/200" alt="포스트 썸네일" />
        </li>
      </ul>
    </>
  );
}
