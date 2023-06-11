import React from 'react';
import styles from './ProfileProduct.module.css';
import logo from '../../../assets/images/pofileproduct.png';

export default function ProfileProduct() {
  return (
    <>
      <article className={styles['profileProduct-wrapper']}>
        <div className={styles['profileProduct-pic-contain']}>
          <img
            className={styles['profileProduct-pic']}
            src={logo}
            alt="어떤 사진입니다."
          />
        </div>
        <div className={styles['profileProduct-title']}>마딛는음식</div>
        <div className={styles['profileProduct-price']}>35,000원</div>
      </article>
    </>
  );
}
