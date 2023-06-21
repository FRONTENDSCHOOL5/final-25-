import React from 'react';
import styles from './ProductModi.module.css';
import SaveButton from '../../components/common/Header/SaveButton';
import Layout from '../../components/layout/Layout';

export default function ProductModi() {
  return (
    <>
      <Layout>
        <section className={styles['product-image-container']}>
          <div className={styles['product-file-font']}>이미지 등록</div>
          <form action="">
            <label
              className={styles['product-file-upload']}
              for="Input"
            ></label>
            <input className="a11y-hidden" type="file" id="Input" />
          </form>
        </section>
        <section className={styles['product-title']}>
          <div>공구 이름</div>
          <input
            className={styles['product-title-input']}
            type="text"
            placeholder="2~15자 이내여야 합니다."
            required
          />
        </section>
        <section className={styles['product-title']}>
          <div>가격</div>
          <input
            className={styles['product-title-input']}
            type="number"
            placeholder="숫자만 입력 가능합니다."
            required
          />
        </section>
        <section className={styles['product-title']}>
          <div>판매링크</div>
          <input
            className={styles['product-title-input']}
            type="text"
            placeholder="URL을 입력해 주세요"
            required
          />
        </section>
      </Layout>
    </>
  );
}
