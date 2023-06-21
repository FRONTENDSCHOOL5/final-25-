import React from 'react';
import styles from './ProfileProduct.module.css';
import Product from '../Product/Product';

export default function ProductList() {
  return (
    <>
      <section className={styles.product}>
        <h2 className={styles['product-title']}>공구 중인 상품</h2>
        <ul className={styles['product-list']}>
          <li>
            <Product />
          </li>
        </ul>
      </section>
    </>
  );
}
