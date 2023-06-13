import React from 'react';
import styles from './SearchUser.module.css';
import BackIcon from '../../assets/images/icon-arrow-left.svg';
import defaultProfileImg from '../../assets/images/profile-img42.png';

export default function SearchUser() {
  return (
    <>
      <section className={styles['SearchWrapper']}>
        <div className={styles['ProductHeader']}>
          <div className={styles['ProductArrow']}>
            <a href="/">
              <img
                className={styles['BackIcon']}
                src={BackIcon}
                alt="뒤로가기 아이콘 입니다."
              />
            </a>
          </div>
          <div className={styles['SearchContain']}>
            <input
              className={styles['SearchInput']}
              type="text"
              placeholder="계정 검색"
            />
          </div>
        </div>

        <div className={`${styles['user']} ${styles['user-search']}`}>
          <h2 className={styles['a11y-hidden']}>사용자 계정</h2>
          <img
            className={styles['profile-cover']}
            src={defaultProfileImg}
            alt="프로필 이미지"
          />
          <div className={styles['user-info']}>
            <h3 className={styles['user-name']}>
              <span className={styles['user-strong']}>애월읍 </span>위니브
              감귤농장
            </h3>
            <div className={styles['user-id']}>@ weniv_Mandarin</div>
          </div>
        </div>
        <div className={`${styles['user']} ${styles['user-search']}`}>
          <h2 className={styles['a11y-hidden']}>사용자 계정</h2>
          <img
            className={styles['profile-cover']}
            src={defaultProfileImg}
            alt="프로필 이미지"
          />
          <div className={styles['user-info']}>
            <h3 className={styles['user-name']}>
              <span className={styles['user-strong']}>애월읍 </span>한라봉
              최고맛집
            </h3>
            <div className={styles['user-id']}>@ weniv_Mandarin</div>
          </div>
        </div>
        <div className={`${styles['user']} ${styles['user-search']}`}>
          <h2 className={styles['a11y-hidden']}>사용자 계정</h2>
          <img
            className={styles['profile-cover']}
            src={defaultProfileImg}
            alt="프로필 이미지"
          />
          <div className={styles['user-info']}>
            <h3 className={styles['user-name']}>
              감귤의 품격 -
              <span className={styles['user-strong']}> 애월읍 </span>
            </h3>
            <div className={styles['user-id']}>@ weniv_Mandarin</div>
          </div>
        </div>

        <footer>
          <nav className={styles['nav-bar']}>
            <ul className={styles['menu-list']}>
              <li>
                <a href="/" className={styles['menu-home']}>
                  홈
                </a>
              </li>
              <li>
                <a href="/chat" className={styles['menu-chat']}>
                  채팅
                </a>
              </li>
              <li>
                <a href="/upload" className={styles['menu-post']}>
                  게시물 작성
                </a>
              </li>
              <li>
                <a href="/profile" className={styles['menu-profile']}>
                  프로필
                </a>
              </li>
            </ul>
          </nav>
        </footer>
      </section>
    </>
  );
}
