import React from 'react';
import styles from './Header.module.css';
import IconArrowLeft from '../../../assets/images/icon-arrow-left.svg';

export default function FollowersHeader() {
  return (
    <header className={styles['header-wrap']}>
      <div className={styles['left']}>
        <button className={styles['btn-back']}>
          <img src={IconArrowLeft} alt="뒤로가기" />
        </button>
        <span className={['chat-title']}>Followers</span>
      </div>
    </header>
  );
}
