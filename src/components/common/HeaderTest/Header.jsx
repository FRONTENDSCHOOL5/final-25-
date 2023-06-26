import React from 'react';
import useGoBack from '../../../hooks/useGoBack';
import styles from './Header.module.css';
import IconArrowLeft from '../../../assets/images/icon-arrow-left.svg';
import IconMoreVertical from '../../../assets/images/s-icon-more-vertical.svg';
import IconSearch from '../../../assets/images/icon-search.svg';

export default function Header({
  type,
  isButtonEnabled,
  btnHandler,
  modalOpen,
}) {
  const goBack = useGoBack();

  const HeaderUI = {
    none: <></>,
    header: (
      <header className={styles['header-wrap']}>
        <button className={styles['btn-back']} onClick={goBack}>
          <img src={IconArrowLeft} alt="뒤로가기" />
        </button>
        <button className={styles['btn-more']}>
          <img src={IconMoreVertical} alt="메뉴보기" onClick={modalOpen} />
        </button>
      </header>
    ),
    userSearch: (
      <header className={styles['header-wrap']}>
        <button className={styles['btn-back']} onClick={goBack}>
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
        <a href="/#" class={styles['title']}>
          먹을사람? 피드
        </a>
        <button className={styles['btn-search']}>
          <img src={IconSearch} alt="검색하기" />
        </button>
      </header>
    ),
    saveButton: (
      <header className={styles['header-wrap']}>
        <button className={styles['btn-back']} onClick={goBack}>
          <img src={IconArrowLeft} alt="뒤로가기" />
        </button>
        <button className={styles['btn-save']} disabled>
          저장
        </button>
      </header>
    ),
    colorButton: (
      <header className={styles['header-wrap']}>
        <button className={styles['btn-back']} onClick={goBack}>
          <img src={IconArrowLeft} alt="뒤로가기" />
        </button>
        <button className={styles['btn-save-color']} type="submit">
          저장
        </button>
      </header>
    ),
    uploadButton: (
      <header className={styles['header-wrap']}>
        <button className={styles['btn-back']} onClick={goBack}>
          <img src={IconArrowLeft} alt="뒤로가기" />
        </button>
        <button className={styles['btn-save']}>업로드</button>
      </header>
    ),
    uploadColorButton: (
      <header className={styles['header-wrap']}>
        <button className={styles['btn-back']} onClick={goBack}>
          <img src={IconArrowLeft} alt="뒤로가기" />
        </button>
        <button className={styles['btn-upload-color']}>업로드</button>
      </header>
    ),
    chatHeader: (
      <header className={styles['header-wrap']}>
        <div className={styles['left']}>
          <button className={styles['btn-back']} onClick={goBack}>
            <img src={IconArrowLeft} alt="뒤로가기" />
          </button>
          <span className={['chat-title']}>애월읍 위니브 감귤 농장</span>
        </div>
        <button className={styles['btn-more']} onClick={modalOpen}>
          <img src={IconMoreVertical} alt="메뉴보기" />
        </button>
      </header>
    ),
    followers: (
      <header className={styles['header-wrap']}>
        <div className={styles['left']}>
          <button className={styles['btn-back']} onClick={goBack}>
            <img src={IconArrowLeft} alt="뒤로가기" />
          </button>
          <span className={['chat-title']}>Followers</span>
        </div>
      </header>
    ),
  };
  return HeaderUI[type];
}
