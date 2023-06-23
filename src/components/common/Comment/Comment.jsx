import React from 'react';
import styles from './Comment.module.css';
import profileImg from '../../../assets/images/profile-img42.png';

export default function Comment({ data, postId }) {
  console.log(data, postId);
  const date = new Date(data['createdAt']);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const formattedDate = `${year}년 ${month}월 ${day}일`;
  return (
    <section className={styles['comment']}>
      <img
        className={styles['comment-author-profile']}
        src={profileImg}
        alt="댓글 작성자 프로필"
      />
      <div className={styles['comment-container']}>
        <div className={styles['comment-info']}>
          <strong className={styles['comment-author']}>
            {data['author']['username']}
          </strong>
          <span className={styles['comment-create-time']}>
            · {formattedDate}
          </span>
        </div>
        <p className={styles['comment-txt']}>{data['content']}</p>
      </div>
      <button className={styles['btn-post-more']} type="button">
        <span className="a11y-hidden">포스트 메뉴</span>
      </button>
    </section>
  );
}
