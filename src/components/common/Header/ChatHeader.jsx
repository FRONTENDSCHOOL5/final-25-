import React from 'react';
import styles from './Header.module.css';
import IconArrowLeft from '../../../assets/images/icon-arrow-left.svg';
import IconMoreVertical from '../../../assets/images/s-icon-more-vertical.svg';

export default function ChatHeader() {
  return (
    <header className={styles['header-wrap']}>
      <div className={styles['left']}>
        <button className={styles['btn-back']}>
          <img src={IconArrowLeft} alt="뒤로가기" />
        </button>
        <span className={['chat-title']}>위니브 감귤 농장</span>
      </div>
      <button className={styles['btn-more']}>
        <img src={IconMoreVertical} alt="메뉴보기" />
      </button>
    </header>
  );
}
