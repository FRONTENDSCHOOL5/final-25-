import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Modal.module.css';
import commentAPI from '../../../api/commentAPI';
import AlertModal from './AlertModal/AlertModal';

export default function Modal({
  modalClose,
  modalMenu,
  postId,
  productId,
  productUrl,
  commentId,
}) {
  const token = localStorage.getItem('token');
  const [alertShow, setAlertShow] = useState(false);
  const [alertType, setAlertType] = useState('post-delete');

  const alertOpen = type => {
    setAlertShow(true);
    setAlertType(type);
  };

  const productMoreClickHandler = () => {
    window.open(productUrl, '_blank');
  };

  const commetReportAction = async () => {
    await reportComment().then(() => alertOpen('report'));

    async function reportComment() {
      try {
        await commentAPI.reportComment({ token, postId, commentId });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const menuArr = {
    'delete-post': (
      <button
        className={styles['delete-post']}
        onClick={() => alertOpen('post-delete')}
      >
        삭제
      </button>
    ),
    'report-post': (
      <button
        className={styles['report-post']}
        onClick={() => alertOpen('report')}
      >
        신고하기
      </button>
    ),
    'product-delete': (
      <button
        className={styles['product-delete']}
        onClick={() => alertOpen('product-delete')}
      >
        삭제
      </button>
    ),
    'product-modi': (
      <Link to="/product/m" className={styles['product-modi']}>
        수정
      </Link>
    ),
    'product-more': (
      <Link
        to=""
        className={styles['product-more']}
        onClick={productMoreClickHandler}
      >
        웹사이트에서 상품보기
      </Link>
    ),
    'delete-comment': (
      <button
        className={styles['report-comment']}
        onClick={() => alertOpen('comment-delete')}
      >
        삭제하기
      </button>
    ),
    'report-comment': (
      <button className={styles['report-comment']} onClick={commetReportAction}>
        신고하기
      </button>
    ),
    'report-chat': (
      <button
        className={styles['report-chat']}
        onClick={() => alertOpen('report')}
      >
        신고하기
      </button>
    ),
    'edit-post': <button className={styles['edit-post']}>수정</button>,
    setting: (
      <a href="/profile" className={styles['setting']}>
        설정 및 개인정보
      </a>
    ),
    logout: (
      <button className={styles['logout']} onClick={() => alertOpen('logout')}>
        로그아웃
      </button>
    ),
    exit: <button className={styles['exit-btn']}>채팅방 나가기</button>,
  };

  return (
    <>
      <section
        className={`${styles['hidden-menu']} ${styles['active']}`}
        onClick={modalClose}
      >
        <h2 className="a11y-hidden">메뉴</h2>
        <ul className={styles['hidden-menu-list']}>
          {modalMenu.map(item => {
            return <li key={item}>{menuArr[item]}</li>;
          })}
        </ul>
      </section>
      {alertShow && (
        <AlertModal
          type={alertType}
          modalClose={modalClose}
          postId={postId}
          productId={productId}
          commentId={commentId}
        />
      )}
    </>
  );
}

//Alert을 열고 동작에 필요한 정보를 props로 보내야 합니다.
