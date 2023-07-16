import React from 'react';
import styles from './Comment.module.css';

export default function Comment({ data, postId, modalOpen, getCommentId }) {
  console.log(data, postId);
  const date = new Date(data['createdAt']);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const formattedDate = `${year}년 ${month}월 ${day}일`;

  const commentMoreHandler = event => {
    // 모달이 오픈되고
    modalOpen();
    // 댓글 id를 넘겨 줘야해
    getCommentId(event);
  };

  return (
    <section className={styles['comment']}>
      <img
        className={styles['comment-author-profile']}
        src={data['author']['image']}
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
      <button
        className={styles['btn-comment-more']}
        type="button"
        onClick={commentMoreHandler}
      >
        <span className="a11y-hidden">댓글 메뉴</span>
      </button>
    </section>
  );
}
