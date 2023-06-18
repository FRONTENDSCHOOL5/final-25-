import React from 'react';
import styles from './Post.module.css';
import basicProfileImg from '../../../assets/images/basic-profile-img.png';

export default function Post() {
  return (
    <>
      <article className={styles['post-item']}>
        <div className={styles['post-header']}>
          <img
            className={styles['author-profile']}
            src={basicProfileImg}
            alt="작성자 프로필 이미지"
          />
          <div className={styles['author-info']}>
            <h4 className={styles['post-title']}>고기 먹을 사람?</h4>
            <strong className={styles['author-name']}>
              이오에서만은 디자인왕
            </strong>
            <span className={styles['author-id']}>@ e5_designKing99</span>
          </div>
        </div>
        <div className={styles['post-contents']}>
          <ul className={styles['plan-list']}>
            <li className={styles.menu}>
              메뉴<span className={styles['menu-value']}>고기</span>
            </li>
            <li className={styles.place}>
              장소
              <span className={styles['place-value']}>제줏간 방이점</span>
            </li>
            <li className={styles.date}>
              일시
              <span className={styles['date-value']}>오늘, 오후 6시</span>
            </li>
            <li className={styles.personnel}>
              인원<span className={styles['personnel-value']}>4명</span>
            </li>
          </ul>
          <div className={styles['post-img-container']}>
            <ul className={styles['post-img-list']}>
              <li className={`${styles['post-img']} ${styles['on']}`}>
                <img src="https://picsum.photos/200" alt="음식 사진" />
              </li>
              <li className={styles['post-img']}>
                <img src="https://picsum.photos/200" alt="음식 사진" />
              </li>
            </ul>
            <ul className={styles['post-img-control']}>
              <li>
                <button className={styles['on']} type="button"></button>
              </li>
              <li>
                <button className="" type="button"></button>
              </li>
            </ul>
          </div>
          <p className={styles['post-text']}>
            마라전골 맛잇쪄마라전골 맛잇쪄마라전골 맛잇쪄마라전골 맛잇쪄마라전골
            맛잇쪄마라전골 맛잇쪄마라전골 맛잇쪄마라전골 맛잇쪄마라전골
            맛잇쪄마라전골 맛잇쪄
          </p>
        </div>
        <div className={styles['post-footer']}>
          <div className={styles['post-reaction']}>
            <button type="button" className={styles['btn-like']}>
              <span className="a11y-hidden">좋아요 버튼</span>
              <span className={styles['like-count']}>0</span>
            </button>
            <a href="/post" className={styles['btn-comment']}>
              <span className="a11y-hidden">댓글 쓰러가기 버튼</span>
              <span className={styles['comment-count']}>0</span>
            </a>
          </div>
          <span className={styles['create-date']}>2023년 06월 06일</span>
        </div>
        <button className={styles['btn-post-more']} type="button">
          <span className="a11y-hidden">포스트 메뉴</span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 9.75C9.41421 9.75 9.75 9.41421 9.75 9C9.75 8.58579 9.41421 8.25 9 8.25C8.58579 8.25 8.25 8.58579 8.25 9C8.25 9.41421 8.58579 9.75 9 9.75Z"
              fill="#C4C4C4"
              stroke="#C4C4C4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9 4.5C9.41421 4.5 9.75 4.16421 9.75 3.75C9.75 3.33579 9.41421 3 9 3C8.58579 3 8.25 3.33579 8.25 3.75C8.25 4.16421 8.58579 4.5 9 4.5Z"
              fill="#C4C4C4"
              stroke="#C4C4C4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9 15C9.41421 15 9.75 14.6642 9.75 14.25C9.75 13.8358 9.41421 13.5 9 13.5C8.58579 13.5 8.25 13.8358 8.25 14.25C8.25 14.6642 8.58579 15 9 15Z"
              fill="#C4C4C4"
              stroke="#C4C4C4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </article>
    </>
  );
}
