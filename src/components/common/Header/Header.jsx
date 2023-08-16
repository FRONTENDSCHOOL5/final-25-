import React from 'react';
import styles from './Header.module.css';
import IconArrowLeft from '../../../assets/images/icon-arrow-left.svg';
import IconMoreVertical from '../../../assets/images/s-icon-more-vertical.svg';
import IconSearch from '../../../assets/images/icon-search.svg';
import { useNavigate, Link } from 'react-router-dom';
import { debounce } from 'lodash';

export default function Header({ type, modalOpen, chatTitle, setKeyword }) {
  const navigate = useNavigate();

  const searchHandler = debounce(event => {
    setKeyword(event.target.value);
  }, 150);

  const HeaderUI = {
    none: <></>,
    header: (
      <header className={styles['header-wrap']}>
        <button className={styles['btn-back']} onClick={() => navigate(-1)}>
          <img src={IconArrowLeft} alt="뒤로가기" />
        </button>
        <button className={styles['btn-more']}>
          <img src={IconMoreVertical} alt="메뉴보기" onClick={modalOpen} />
        </button>
      </header>
    ),
    userSearch: (
      <header className={styles['header-wrap']}>
        <button className={styles['btn-back']} onClick={() => navigate(-1)}>
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
          onChange={searchHandler}
        />
      </header>
    ),
    homeSearch: (
      <header className={styles['header-wrap']}>
        <Link to="/#" className={styles['title']}>
          먹을사람? 피드
        </Link>
        <button
          className={styles['btn-search']}
          onClick={() => {
            navigate('/search');
          }}
        >
          <img src={IconSearch} alt="검색하기" />
        </button>
      </header>
    ),
    saveButton: (
      <header className={styles['header-wrap']}>
        <button
          className={styles['btn-back']}
          onClick={() => navigate(-1)}
          type="button"
        >
          <img src={IconArrowLeft} alt="뒤로가기" />
        </button>
        <button className={styles['btn-save']} disabled>
          저장
        </button>
      </header>
    ),
    colorButton: (
      <header className={styles['header-wrap']}>
        <button
          className={styles['btn-back']}
          onClick={() => navigate(-1)}
          type="button"
        >
          <img src={IconArrowLeft} alt="뒤로가기" />
        </button>
        <button className={styles['btn-save-color']} type="submit">
          저장
        </button>
      </header>
    ),
    uploadButton: (
      <header className={styles['header-wrap']}>
        <button className={styles['btn-back']} onClick={() => navigate(-1)}>
          <img src={IconArrowLeft} alt="뒤로가기" />
        </button>
        <button className={styles['btn-save']}>업로드</button>
      </header>
    ),
    uploadColorButton: (
      <header className={styles['header-wrap']}>
        <button className={styles['btn-back']} onClick={() => navigate(-1)}>
          <img src={IconArrowLeft} alt="뒤로가기" />
        </button>
        <button className={styles['btn-upload-color']}>업로드</button>
      </header>
    ),
    chatHeader: (
      <header className={styles['header-wrap']}>
        <div className={styles['left']}>
          <button className={styles['btn-back']} onClick={() => navigate(-1)}>
            <img src={IconArrowLeft} alt="뒤로가기" />
          </button>
          <span className={['chat-title']}>{chatTitle}</span>
        </div>
        <button className={styles['btn-more']} onClick={modalOpen}>
          <img src={IconMoreVertical} alt="메뉴보기" />
        </button>
      </header>
    ),
    followers: (
      <header className={styles['header-wrap']}>
        <div className={styles['left']}>
          <button className={styles['btn-back']} onClick={() => navigate(-1)}>
            <img src={IconArrowLeft} alt="뒤로가기" />
          </button>
          <span className={['chat-title']}>Followers</span>
        </div>
      </header>
    ),
    followings: (
      <header className={styles['header-wrap']}>
        <div className={styles['left']}>
          <button className={styles['btn-back']} onClick={() => navigate(-1)}>
            <img src={IconArrowLeft} alt="뒤로가기" />
          </button>
          <span className={['chat-title']}>Followings</span>
        </div>
      </header>
    ),
  };
  return HeaderUI[type];
}
