import React from 'react';
import styles from './Comment.module.css';
import profileImg from '../../../assets/images/profile-img42.png';

export default function Comment() {
  return (
    <section className={styles['comment']}>
      <img
        className={styles['comment-author-profile']}
        src={profileImg}
        alt="댓글 작성자 프로필"
      />
      <div className={styles['comment-container']}>
        <div className={styles['comment-info']}>
          <strong className={styles['comment-author']}>제주 감귤 농장</strong>
          <span className={styles['comment-create-time']}>· 5분 전</span>
        </div>
        <p className={styles['comment-txt']}>하이디라오 가보셨나여..?</p>
      </div>
      <button className={styles['btn-post-more']} type="button">
        <span className="a11y-hidden">포스트 메뉴</span>
      </button>
    </section>
  );
}
