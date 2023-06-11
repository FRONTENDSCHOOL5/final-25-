import React from 'react';
import styles from './AlertModal.module.css';

export default function AlertModal() {
  return (
    <section className={styles.alert}>
      <div className={styles['alert-inner']}>
        <h2 className={styles['alert-title']}>상품을 삭제할까요?</h2>
        <div className={styles['btn-wrapper']}>
          <button type="button" className={styles['btn-cancel']}>
            취소
          </button>
          <button type="button" className={styles['btn-delete']}>
            삭제
          </button>
        </div>
      </div>
    </section>
  );
}
