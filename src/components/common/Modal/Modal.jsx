import React, { useRef, useState } from 'react';
import styles from './Modal.module.css';

export default function Modal() {
  const modalRef = useRef(null);
  const [isShow, setIsShow] = useState(true);

  const handleClickOutside = event => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      // 클릭된 요소가 ul 영역 외의 요소인 경우에만 이벤트 처리
      setIsShow(false);
    }
  };

  const menu = ['delete-post', 'report-post'];
  const menuArr = {
    'delete-post': <button className={styles['delete-post']}>삭제</button>,
    'report-post': <button className={styles['report-post']}>신고하기</button>,
    'report-comment': (
      <button className={styles['report-comment']}>신고하기</button>
    ),
    'edit-post': <button className={styles['edit-post']}>수정</button>,
    logout: <button className={styles['logout']}>로그아웃</button>,
    exit: <button className={styles['exit-btn']}>채팅방 나가기</button>,
  };

  return (
    isShow && (
      <section
        className={`${styles['hidden-menu']} ${styles['active']}`}
        onClick={handleClickOutside}
      >
        <h2 className="a11y-hidden">메뉴</h2>
        <ul className={styles['hidden-menu-list']} ref={modalRef}>
          {menu.map(item => {
            return <li key={item}>{menuArr[item]}</li>;
          })}
        </ul>
      </section>
    )
  );
}
