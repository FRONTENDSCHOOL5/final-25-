import React from 'react';
import styles from './TabMenu.module.css';

export default function TabMenu({ type }) {
  const TabMenuUI = {
    none: <></>,
    home: (
      <footer className={styles['footer']}>
        <nav className={styles['nav-bar']}>
          <ul className={styles['menu-list']}>
            <li>
              <a
                href="/"
                className={`${styles['menu-home']} ${styles['active']}`}
              >
                홈
              </a>
            </li>
            <li>
              <a href="/chat" className={styles['menu-chat']}>
                채팅
              </a>
            </li>
            <li>
              <a href="/post" className={styles['menu-post']}>
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
    ),
    chat: (
      <footer className={styles['footer']}>
        <nav className={styles['nav-bar']}>
          <ul className={styles['menu-list']}>
            <li>
              <a href="/" className={styles['menu-home']}>
                홈
              </a>
            </li>
            <li>
              <a
                href="/chat"
                className={`${styles['menu-chat']} ${styles['active']}`}
              >
                채팅
              </a>
            </li>
            <li>
              <a href="/post" className={styles['menu-post']}>
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
    ),
    post: (
      <footer className={styles['footer']}>
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
              <a
                href="/post"
                className={`${styles['menu-post']} ${styles['active']}`}
              >
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
    ),
    profile: (
      <footer className={styles['footer']}>
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
              <a href="/post" className={styles['menu-post']}>
                게시물 작성
              </a>
            </li>
            <li>
              <a
                href="/profile"
                className={`${styles['menu-profile']} ${styles['active']}`}
              >
                프로필
              </a>
            </li>
          </ul>
        </nav>
      </footer>
    ),
  };
  return TabMenuUI[type];
}
