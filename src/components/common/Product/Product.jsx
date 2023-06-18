import React from 'react';
import styles from './Product.module.css';

export default function ProfileProduct() {
  return (
    <>
      <article className={styles['product-item']}>
        <div className={styles['product-img-container']}>
          <img
            className={styles['product-img']}
            src="https://picsum.photos/200"
            alt="삼품 사진"
          />
        </div>
        <h4 className={styles['product-name']}>이웃집 토토로</h4>
        <div className={styles['product-price']}>35,000원</div>
      </article>
    </>
  );
}
