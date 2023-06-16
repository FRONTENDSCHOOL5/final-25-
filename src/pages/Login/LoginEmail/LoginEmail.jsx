import React from 'react';
import styles from './LoginEmail.module.css';
export default function LoginEmail() {
  return (
    <>
      <header className={styles['login-header']}>
        <h1>로그인</h1>
      </header>
      <main className={styles['login-main']}>
        <form action="">
          <section className={styles['login-main-input']}>
            <span className={styles['login-font']}>이메일</span>
            <label className={styles['a11y-hidden']} htmlFor={'email'}></label>
            <input
              type="email"
              id="email"
              name="email"
              className={styles['login-input']}
              required
            />
          </section>
          <section className={styles['login-main-input']}>
            <span className={styles['login-font']}>비밀번호 </span>
            <label className={styles['a11y-hidden']} htmlFor="password"></label>
            <input
              type="password"
              id="password"
              name="password"
              className={styles['login-input']}
              required
            />
          </section>
          <section className={styles['login-message-warning']}>
            *이메일 또는 비밀번호가 일치하지 않습니다.
          </section>
          <button className={styles['submit-btn']} type="submit">
            로그인
          </button>
        </form>
      </main>
      <footer className={styles['login-join']}>
        <a href="/">이메일로 회원가입</a>
      </footer>
    </>
  );
}
