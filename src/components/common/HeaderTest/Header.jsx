import React from 'react';
import styles from './Header.module.css';
import IconArrowLeft from '../../../assets/images/icon-arrow-left.svg';
import IconMoreVertical from '../../../assets/images/s-icon-more-vertical.svg';
import IconSearch from '../../../assets/images/icon-search.svg';

export default function Header({ type }) {
  const HeaderUI = {
    none: <></>,
    header: (
      <header className={styles['header-wrap']}>
        <button className={styles['btn-back']}>
          <img src={IconArrowLeft} alt="뒤로가기" />
        </button>
        <button className={styles['btn-more']}>
          <img src={IconMoreVertical} alt="메뉴보기" />
        </button>
      </header>
    ),
    userSearch: (
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
    ),
    homeSearch: (
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
    ),
    saveButton: (
      <header className={styles['header-wrap']}>
        <button className={styles['btn-back']}>
          <img src={IconArrowLeft} alt="뒤로가기" />
        </button>
        <button className={styles['btn-save']}>저장</button>
      </header>
    ),
    uploadButton: (
      <header className={styles['header-wrap']}>
        <button className={styles['btn-back']}>
          <img src={IconArrowLeft} alt="뒤로가기" />
        </button>
        <button className={styles['btn-save']}>업로드</button>
      </header>
    ),
    chat: (
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
    ),
    followers: (
      <header className={styles['header-wrap']}>
        <div className={styles['left']}>
          <button className={styles['btn-back']}>
            <img src={IconArrowLeft} alt="뒤로가기" />
          </button>
          <span className={['chat-title']}>Followers</span>
        </div>
        <button className={styles['btn-more']}>
          <img src={IconMoreVertical} alt="메뉴보기" />
        </button>
      </header>
    ),
  };
  return HeaderUI[type];
}
