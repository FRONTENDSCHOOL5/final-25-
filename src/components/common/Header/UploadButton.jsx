import React from 'react';
import styles from './Header.module.css';
import IconArrowLeft from '../../../assets/images/icon-arrow-left.svg';

export default function UploadButton() {
  return (
    <header className={styles['header-wrap']}>
      <button className={styles['btn-back']}>
        <img src={IconArrowLeft} alt="뒤로가기" />
      </button>
      <button className={styles['btn-save']}>업로드</button>
    </header>
  );
}
