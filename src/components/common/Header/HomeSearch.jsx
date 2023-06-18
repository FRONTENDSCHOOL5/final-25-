import React from 'react';
import styles from './Header.module.css';
import IconSearch from '../../../assets/images/icon-search.svg';

export default function HomeSearch() {
  return (
    <header className={styles['header-wrap']}>
      <input
        className={styles['inp-search']}
        type="text"
        placeholder={'감귤마켓 피드'}
      />
      <button className={styles['btn-search']}>
        <img src={IconSearch} alt="검색하기" />
      </button>
    </header>
  );
}
