import React from 'react';
import styles from './IconProductModal.module.css';

export default function PostModal() {
  return (
    <section>
      <div className={styles['alert-post']}>
        <button type="button" className={styles['btn-delete']}>
          삭제
        </button>
        <br></br>
        <button type="button" className={styles['btn-edit']}>
          수정
        </button>
        <br></br>
        <button type="button" className={styles['btn-web']}>
          웹사이트에서 상품보기
        </button>
      </div>
    </section>
  );
}
