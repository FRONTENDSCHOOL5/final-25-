import React from 'react';
import styles from './ProductList.module.css';
import productImg from '../../assets/images/pofileproduct.png';

export default function ProductList() {
  return (
    <section className={styles.product}>
      <h2 className={styles['product-title']}>공구중인 상품</h2>
      <ul className={styles['product-list']}>
        <li>
          <article className={styles['product-item']}>
            <div className={styles['product-img-container']}>
              <img className={styles['product-img']} src={productImg} alt="삼품 사진" />
            </div>
            <h4 className={styles['product-name']}>마딛는음식</h4>
            <div className={styles['product-price']}>35,000원</div>
          </article>
        </li>
        <li>
          <article className={styles['product-item']}>
            <div className={styles['product-img-container']}>
              <img className={styles['product-img']} src={productImg} alt="삼품 사진" />
            </div>
            <h4 className={styles['product-name']}>마딛는음식</h4>
            <div className={styles['product-price']}>35,000원</div>
          </article>
        </li>
        <li>
          <article className={styles['product-item']}>
            <div className={styles['product-img-container']}>
              <img className={styles['product-img']} src={productImg} alt="삼품 사진" />
            </div>
            <h4 className={styles['product-name']}>마딛는음식</h4>
            <div className={styles['product-price']}>35,000원</div>
          </article>
        </li>
      </ul>
    </section>
  );
}
