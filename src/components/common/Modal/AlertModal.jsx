import React from 'react';
import styles from './AlertModal.module.css';

export default function AlertModal({ type, modalClose }) {
  const AlertModalUI = {
    'post-delete': (
      <section className={styles.alert}>
        <div className={styles['alert-inner']}>
          <h2 className={styles['alert-title']}>상품을 삭제할까요?</h2>
          <div className={styles['btn-wrapper']}>
            <button
              type="button"
              className={styles['btn-cancel']}
              onClick={modalClose}
            >
              취소
            </button>
            <button
              type="button"
              className={styles['btn-delete']}
              onClick={modalClose}
            >
              삭제
            </button>
          </div>
        </div>
      </section>
    ),
    logout: (
      <section className={styles.alert}>
        <div className={styles['alert-inner']}>
          <h2 className={styles['alert-title']}>로그아웃하시겠어요?</h2>
          <div className={styles['btn-wrapper']}>
            <button
              type="button"
              className={styles['btn-cancel']}
              onClick={modalClose}
            >
              취소
            </button>
            <button
              type="button"
              className={styles['btn-logout']}
              onClick={modalClose}
            >
              로그아웃
            </button>
          </div>
        </div>
      </section>
    ),
  };
  return AlertModalUI[type];
}
