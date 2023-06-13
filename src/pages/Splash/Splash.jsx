import React from 'react';
import styles from './Splash.module.css';
import fullLogoImg from '../../assets/images/full-logo.png';

export default function Splash() {
  return (
    <main className={styles.splash}>
      <h1 className={styles['splash-logo']}>
        <img src={fullLogoImg} alt="먹을사람(드실?)" />
      </h1>
    </main>
  );
}
