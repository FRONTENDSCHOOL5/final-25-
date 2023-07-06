import React, { useState } from 'react';
import AlertModal from './AlertModal/AlertModal';
import styles from './Modal.module.css';

export default function Modal({ modalClose, modalMenu, postId }) {
  const [alertShow, setAlertShow] = useState(false);
  const [alertType, setAlertType] = useState('post-delete');

  const alertOpen = type => {
    setAlertShow(true);
    setAlertType(type);
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
    'report-comment': (
      <button className={styles['report-comment']}>신고하기</button>
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
        <AlertModal type={alertType} modalClose={modalClose} postId={postId} />
      )}
    </>
  );
}

//Alert을 열고 동작에 필요한 정보를 props로 보내야 합니다.
