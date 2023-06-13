import React from 'react';
import styles from './NotFound.module.css';
import notFoundImg from '../../assets/images/404.png';

export default function NotFound() {
  return (
    <main className={styles['not-found']}>
      <h1 className={styles['not-found-logo']}>
        <img src={notFoundImg} alt="페이지를 찾을 수 없습니다." />
      </h1>
      <h2 className={styles['not-found-txt']}>페이지를 찾을 수 없습니다 &#58;&#40;</h2>
      <a className={styles['btn-back']} href="/#">
        이전 페이지
      </a>
    </main>
  );
}
