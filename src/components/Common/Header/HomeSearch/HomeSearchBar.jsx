import React from 'react';
import styles from './HomeSearchBar.module.css';
import IconSearch from '../../../../assets/images/icon-search.svg';

export default function HomeSearchBar() {
  return (
    <header>
      <div className={styles['header-wrap']}>
        <input
          className={styles['inp-search']}
          type="text"
          palceholder={'감귤마켓 피드'}
        />
        <button className={styles['btn-search']}>
          <img src={IconSearch} alt="검색하기" />
        </button>
      </div>
    </header>
  );
}
