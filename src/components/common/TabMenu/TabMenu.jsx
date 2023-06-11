import React from 'react';
import styles from './TabMenu.module.css';

export default function TabMenu() {
  return (
    <nav className={styles['nav-bar']}>
      <ul className={styles['menu-list']}>
        <li>
          <a href="/#" className={styles['menu-home']}>
            홈
          </a>
        </li>
        <li>
          <a href="/#" className={styles['menu-chat']}>
            채팅
          </a>
        </li>
        <li>
          <a href="/#" className={styles['menu-post']}>
            게시물 작성
          </a>
        </li>
        <li>
          <a href="/#" className={styles['menu-profile']}>
            프로필
          </a>
        </li>
      </ul>
    </nav>
  );
}
