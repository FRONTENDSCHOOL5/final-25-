import React from 'react';
import styles from './FeedNone.module.css';

export default function FeedNone() {
  return (
    <>
      <header>먹을사람? 피드</header>
      <main>
        <h2 className={styles['a11y-hidden']}>감귤마켓 피드</h2>
        <div className={styles['feed-none']}>
          <p>유저를 검색해 팔로우 해보세요!</p>
          <a href="/search" className={styles['btn-search']}>
            검색하기
          </a>
        </div>
        <div className={styles.feed}></div>
      </main>
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
    </>
  );
}
