import React from 'react';
import styles from '.././User.module.css';
import defaultProfileImg from '../../../../assets/images/profile-img42.png';

export default function UserSearch() {
  const chats = [
    {
      id: 1,
      name: '냠냠이',
    },
    {
      id: 2,
      name: ' 쩝쩝이',
    },
    {
      id: 3,
      name: '호로록',
    },
    {
      id: 4,
      name: ' 통통이',
    },
  ];

  return (
    <>
      <div className={`${styles['user']} ${styles['user-search']}`}>
        <h2 className="a11y-hidden">사용자 계정</h2>
        <img
          className={styles['profile-cover']}
          src={defaultProfileImg}
          alt="프로필 이미지"
        />
        <div className={styles['user-info']}>
          <h3 className={styles['user-name']}>
            <span>애월읍</span> {chats[0].name}
          </h3>
          <span className={styles['user-id']}>@ weniv_Mandarin</span>
        </div>
      </div>
      <div className={styles['user']}>
        <h2 className="a11y-hidden">사용자 계정</h2>
        <img
          className={styles['profile-cover']}
          src={defaultProfileImg}
          alt="프로필 이미지"
        />
        <div className={styles['user-info']}>
          <h3 className={styles['user-name']}>
            <span>애월읍</span> {chats[1].name}
          </h3>
          <span className={styles['user-id']}>@ weniv_Mandarin</span>
        </div>
      </div>
      <div className={styles['user']}>
        <h2 className="a11y-hidden">사용자 계정</h2>
        <img
          className={styles['profile-cover']}
          src={defaultProfileImg}
          alt="프로필 이미지"
        />
        <div className={styles['user-info']}>
          <h3 className={styles['user-name']}>
            <span>애월읍</span> {chats[2].name}
          </h3>
          <span className={styles['user-id']}>@ weniv_Mandarin</span>
        </div>
      </div>
      <div className={styles['user']}>
        <h2 className="a11y-hidden">사용자 계정</h2>
        <img
          className={styles['profile-cover']}
          src={defaultProfileImg}
          alt="프로필 이미지"
        />
        <div className={styles['user-info']}>
          <h3 className={styles['user-name']}>
            <span>애월읍</span>
            {chats[3].name}
          </h3>
          <span className={styles['user-id']}>@ weniv_Mandarin</span>
        </div>
      </div>
    </>
  );
}
