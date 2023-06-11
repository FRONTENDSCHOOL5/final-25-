import React from 'react';
import styles from './InputComment.module.css';
import profileImg from '../../../assets/images/profile-img42.png';

export default function InputComment() {
  return (
    <section className={styles['input-comment-area']}>
      <div className={styles['input-comment-inner']}>
        {/* <h2 className={styles['a11y-hidden']}>댓글 입력란</h2> */}
        <img
          className={styles['profile-cover']}
          src={profileImg}
          alt="프로필 이미지"
        />
        <label htmlFor="inputComment" className={styles['a11y-hidden']}>
          {/* 댓글 입력하기 */}
          <input
            type="text"
            placeholder="댓글 입력하기..."
            name="comment"
            id="inputComment"
            className={styles['input-comment']}
          />
        </label>

        <button className={styles['btn-add']} type="button">
          게시
        </button>
      </div>
    </section>
  );
}
