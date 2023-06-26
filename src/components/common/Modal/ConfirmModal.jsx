import React, { useState } from 'react';
import styles from './ConfirmModal.module.css';

export default function ConfirmModal({ type, modalClose }) {
  const ConfirmMoalUI = {
    'report-chat': (
      <section className={styles.confirm}>
        <div className={styles['confirm-inner']}>
          <h2 className={styles['confirm-title']}>게시글을 삭제할까요?</h2>
          <button
            type="button"
            className={styles['btn-ok']}
            onClick={modalClose}
          >
            확인
          </button>
        </div>
      </section>
    ),
  };
  return ConfirmMoalUI[type];
}
