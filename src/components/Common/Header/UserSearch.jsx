import React from 'react';
import styles from './Header.module.css';
import IconArrowLeft from '../../../assets/images/icon-arrow-left.svg';

export default function UserSearch() {
  return (
    <header className={styles['header-wrap']}>
      <button className={styles['btn-back']}>
        <img
          className={styles['img-back']}
          src={IconArrowLeft}
          alt="뒤로가기"
        />
      </button>
      <input
        className={styles['inp-userSearch']}
        type="text"
        placeholder={'계정검색'}
      />
    </header>
  );
}
