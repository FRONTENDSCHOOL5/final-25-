import React, { useEffect } from 'react';
import styles from '.././User.module.css';
import defaultProfileImg from '../../../../assets/images/profile-img42.png';
import { Link } from 'react-router-dom';

export default function UserSearch() {
  /**
   * **.2.4 검색**
   * - 감귤마켓 피드 상단에 돋보기 버튼(검색 버튼)을 클릭하면 표시되는 페이지입니다
   * - 사용자 이름과 계정을 검색할 수 있는 페이지입니다. 입력창에 텍스트를 입력하면 해당하는 사용자가 나오도록 합니다
   * - 검색어와 같은 단어에는 주황색 글씨가 표시됩니다.
   */
  const token = localStorage.getItem('token');
  const username = 'lebao';
  useEffect(() => {}, []);

  return (
    <>
      <ul className={styles['user-list']}>
        <li className={styles['user-item']}>
          <Link to={`/profile/${username}`}>
            <img
              className={styles['profile-cover']}
              src={defaultProfileImg}
              alt="프로필 이미지"
            />
            <div className={styles['user-info']}>
              <strong className={styles['user-name']}>러바오</strong>
              <span className={styles['user-id']}>@ lebao</span>
            </div>
          </Link>
        </li>
        <li className={styles['user-item']}>
          <Link to={`/profile/${username}`}>
            <img
              className={styles['profile-cover']}
              src={defaultProfileImg}
              alt="프로필 이미지"
            />
            <div className={styles['user-info']}>
              <strong className={styles['user-name']}>러바오</strong>
              <span className={styles['user-id']}>@ lebao</span>
            </div>
          </Link>
        </li>
        <li className={styles['user-item']}>
          <Link to={`/profile/${username}`}>
            <img
              className={styles['profile-cover']}
              src={defaultProfileImg}
              alt="프로필 이미지"
            />
            <div className={styles['user-info']}>
              <strong className={styles['user-name']}>러바오</strong>
              <span className={styles['user-id']}>@ lebao</span>
            </div>
          </Link>
        </li>
      </ul>
    </>
  );
}
