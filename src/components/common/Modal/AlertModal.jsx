import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AlertModal.module.css';

export default function AlertModal({ type, modalClose }) {
  const navigate = useNavigate();

  const logoutAction = event => {
    modalClose(event);
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('accountname');
    window.localStorage.removeItem('username');
    navigate('/');
  };
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
              onClick={logoutAction}
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
