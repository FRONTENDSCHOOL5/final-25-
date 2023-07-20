import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AlertModal.module.css';
import commentAPI from '../../../../api/commentAPI';

export default function AlertModal({
  type,
  modalClose,
  postId,
  productId,
  commentId,
}) {
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

  const productDeleteAction = async event => {
    modalClose(event);
    console.log(productId);
    await fetchPostDelete();
    window.location.reload();

    async function fetchPostDelete() {
      console.log({ token, postId, commentId });
      const response = await fetch(
        `https://api.mandarin.weniv.co.kr/product/${productId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      console.log(productId, data);
    }
  };

  const commentDeleteAction = async event => {
    modalClose(event);
    console.log(productId);
    await deleteComment();
    window.location.reload();

    async function deleteComment() {
      try {
        await commentAPI.deleteComment({ token, postId, commentId });
      } catch (error) {
        console.error(error);
      }
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
  const chatOutAction = event => {
    modalClose(event);
    navigate('/chat');
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
    'product-delete': (
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
              onClick={productDeleteAction}
            >
              삭제
            </button>
          </div>
        </div>
      </section>
    ),
    'comment-delete': (
      <section className={styles.alert}>
        <div className={styles['alert-inner']}>
          <h2 className={styles['alert-title']}>댓글을 삭제할까요?</h2>
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
              onClick={commentDeleteAction}
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
    share: (
      <section className={styles['confirm-copied']}>
        <article className={styles.confirm}>
          <div className={styles['confirm-inner']}>
            <h2 className={styles['confirm-title']}>
              클립보드에 복사되었습니다
            </h2>
            <button
              type="button"
              className={styles['btn-ok']}
              onClick={modalClose}
            >
              확인
            </button>
          </div>
        </article>
      </section>
    ),
    notice: (
      <section className={styles['confirm-notice']}>
        <article className={styles.confirm}>
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
        </article>
      </section>
    ),
    'chat-out': (
      <section className={styles.alert}>
        <div className={styles['alert-inner']}>
          <h2 className={styles['alert-title']}>채팅방을 나가시겠어요?</h2>
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
              className={styles['btn-chat-out']}
              onClick={chatOutAction}
            >
              나가기
            </button>
          </div>
        </div>
      </section>
    ),
  };
  return AlertModalUI[type];
}
