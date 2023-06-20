import React, { useState } from 'react';
import styles from './LoginMain.module.css';
import logo from '../../../assets/images/symbol-logo.png';
import { Link } from 'react-router-dom';
import LoginEmail from '../LoginEmail/LoginEmail';

export default function LoginMain() {
  const [isEmailLogin, setIsEmailLogin] = useState(false);

  const handleEmailLogin = () => {
    setIsEmailLogin(true);
  };
  return (
    <>
      {isEmailLogin ? (
        <LoginEmail />
      ) : (
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
              <button
                type="button"
                className={styles['btn-email']}
                onClick={handleEmailLogin}
              >
                이메일로 로그인
              </button>
              <span>&#124;</span>
              <Link to="/join">회원 가입</Link>
            </article>
          </section>
        </main>
      )}
    </>
  );
}
