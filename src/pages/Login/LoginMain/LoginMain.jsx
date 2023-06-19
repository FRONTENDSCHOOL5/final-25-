import React from 'react';
import styles from './LoginMain.module.css';
import logo from '../../../assets/images/symbol-logo.png';
import { Link } from 'react-router-dom';

export default function LoginMain() {
  return (
    <>
      <main className={styles['login-header']}>
        <img
          className={styles['login-header-img']}
          src={logo}
          alt="드실 캐릭터"
        />
        <section className={styles['login-main']}>
          <article
            className={`${styles['login-btn']} ${styles['login-btn-kakao']}`}
          >
            <a href="/">카카오 계정으로 로그인 </a>
          </article>
          <article
            className={`${styles['login-btn']} ${styles['login-btn-google']}`}
          >
            <a href="/">구글 계정으로 로그인 </a>
          </article>
          <article
            className={`${styles['login-btn']} ${styles['login-btn-facebook']}`}
          >
            <a href="/">페이스북 계정으로 로그인 </a>
          </article>
          <article className={styles['login-main-link']}>
            <Link to="/login/email">이메일로 로그인</Link>
            <span>&#124;</span>
            <Link to="/join">회원 가입</Link>
          </article>
        </section>
      </main>
    </>
  );
}
