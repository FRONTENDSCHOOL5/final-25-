import React from 'react';
import { Fragment } from 'react';
import styles from './LoginMain.module.css';
import logo from '../../../assets/images/symbol-logo.png';

export default function LoginMain() {
  return (
    <>
      <section className={styles['LoginMain-wrapper']}>
        .
        <article className={styles['LoginMain']}>
          <img
            className={styles['LoginMain-img']}
            src={logo}
            alt="드실 캐릭터입니다."
          />
        </article>
        <article className={styles['LoginMain-Modal']}>
          <div className={`${styles['btn']} ${styles['LoginMain-ka']}`}>
            <a href="/">카카오 계정으로 로그인 </a>
          </div>
          <div className={`${styles['btn']} ${styles['LoginMain-google']}`}>
            <a href="/">구글 계정으로 로그인 </a>
          </div>
          <div className={`${styles['btn']} ${styles['LoginMain-facebook']}`}>
            <a href="/">페이스북 계정으로 로그인 </a>
          </div>
          <div className={styles['LoginMain-link-wrapper']}>
            <a href="/">이메일로 로그인</a>
            <span>|</span>
            <a href="/">회원 가입</a>
          </div>
        </article>
      </section>
    </>
  );
}
