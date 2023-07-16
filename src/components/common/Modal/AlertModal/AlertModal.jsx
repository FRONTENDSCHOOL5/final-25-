import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AlertModal.module.css';

export default function AlertModal({ type, modalClose, postId }) {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const postDeleteAction = event => {
    modalClose(event);
    fetchPostDelete();
    window.location.reload();

    async function fetchPostDelete() {
      const response = await fetch(
        `https://api.mandarin.weniv.co.kr/post/${postId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      console.log(postId, data);
    }
  };

  const logoutAction = event => {
    modalClose(event);
    localStorage.removeItem('token');
    localStorage.removeItem('accountname');
    localStorage.removeItem('username');
    navigate('/');
  };

  const photoNoticeAction = event => {
    modalClose(event);
  };

  const AlertModalUI = {
    'post-delete': (
      <section className={styles.alert}>
        <div className={styles['alert-inner']}>
          <h2 className={styles['alert-title']}>게시글을 삭제할까요?</h2>
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
              onClick={postDeleteAction}
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
    report: (
      <section className={styles.confirm}>
        <div className={styles['confirm-inner']}>
          <h2 className={styles['confirm-title']}>신고되었습니다</h2>
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
    'photo-notice': (
      <section className={styles.confirm}>
        <div className={styles['confirm-inner']}>
          <h2 className={styles['confirm-title']}>
            사진은 3장까지 업로드 가능합니다.
          </h2>
          <button
            type="button"
            className={styles['btn-ok']}
            onClick={photoNoticeAction}
          >
            확인
          </button>
        </div>
      </section>
    ),
  };
  return AlertModalUI[type];
}
