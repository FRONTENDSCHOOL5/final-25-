import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Post.module.css';
import basicProfileImg from '../../../assets/images/basic-profile-img.png';

export default function Post({ data, accountName, modalOpen, getPostId }) {
  console.log('props로 전달받은 data: ', data);
  console.log('hearted', data['hearted']);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  // 게시글 작성자 클릭 이벤트
  const authorClickHandler = event => {
    const closestArticle = event.target.closest('article');
    const postAuthor = closestArticle.getAttribute('data-author');

    if (accountName === postAuthor) {
      navigate('/profile');
    } else {
      navigate(`/profile/${postAuthor}`);
    }
  };

  // 댓글쓰러가기 클릭 이벤트
  const commentClick = event => {
    const closestArticle = event.target.closest('article');
    const postId = closestArticle.getAttribute('data-id');
    navigate(`/post/${postId}`);
  };

  // 좋아요 이벤트
  const [likeCount, setLikeCount] = useState(data['heartCount']);
  const [isLike, setIsLike] = useState(false);
  const [likeClass, setLikeClass] = useState(styles['btn-like']);

  useEffect(() => {
    if (data['hearted']) {
      setIsLike(true);
      setLikeClass(`${styles['btn-like']} ${styles['active']}`);
    }
  }, []);

  const likeClickHandler = event => {
    const closestArticle = event.target.closest('article');
    const postId = closestArticle.getAttribute('data-id');
    if (isLike) {
      setIsLike(false);
      setLikeClass(styles['btn-like']);
      setLikeCount(prev => likeCount - 1);

      fetchLikeMinus();
      async function fetchLikeMinus() {
        const response = await fetch(
          `https://api.mandarin.weniv.co.kr/post/${postId}/unheart`,
          {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await response.json();
        console.log('unlike', data);
      }
    } else {
      setIsLike(true);
      setLikeClass(`${styles['btn-like']} ${styles['active']}`);
      setLikeCount(prev => likeCount + 1);

      fetchLikePlus();
      async function fetchLikePlus() {
        const response = await fetch(
          `https://api.mandarin.weniv.co.kr/post/${postId}/heart`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await response.json();
        console.log('like', data);
      }
    }
  };

  const date = new Date(data['createdAt']);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const formattedDate = `${year}년 ${month}월 ${day}일`;

  const contentTxt = data['content'];
  const regex = /\{(.+?)\}/;
  // 예외처리
  const match = contentTxt?.match(regex);

  const foundText = match ? match[0] : null;
  const planContents = foundText ? JSON.parse(foundText) : null;

  // ======= postId 전달
  const moreInfoAction = event => {
    modalOpen(event);
    getPostId(event);
  };
  return (
    <>
      <article
        className={styles['post-item']}
        data-id={data['id']}
        data-author={data['author']['accountname']}
      >
        <div className={styles['post-header']} onClick={authorClickHandler}>
          <img
            className={styles['author-profile']}
            src={data['author']['image']}
            alt="작성자 프로필 이미지"
            onError={basicProfileImg}
          />
          <div className={styles['author-info']}>
            {planContents && (
              <h4 className={styles['post-title']}>{planContents['title']}</h4>
            )}
            <strong className={styles['author-name']}>
              {data['author']['username']}
            </strong>
            <span className={styles['author-id']}>
              @ {data['author']['accountname']}
            </span>
          </div>
        </div>
        <div className={styles['post-contents']}>
          {planContents && (
            <ul className={styles['plan-list']}>
              <li className={styles.menu}>
                메뉴
                <span className={styles['menu-value']}>
                  {planContents['menu']}
                </span>
              </li>
              <li className={styles.place}>
                장소
                <span className={styles['place-value']}>
                  {planContents['place']}
                </span>
              </li>
              <li className={styles.date}>
                일시
                <span className={styles['date-value']}>
                  {planContents['date']}
                </span>
              </li>
              <li className={styles.personnel}>
                인원
                <span className={styles['personnel-value']}>
                  {planContents['people']}
                </span>
              </li>
            </ul>
          )}

          <div className={styles['post-img-container']}>
            <ul className={styles['post-img-list']}>
              {data['image'] ? (
                <li className={`${styles['post-img']} ${styles['on']}`}>
                  <img src={data['image']} alt="음식 사진" />
                </li>
              ) : (
                <></>
              )}
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
            {planContents
              ? data['content'].replace(foundText, '')
              : data['content']}
          </p>
        </div>
        <div className={styles['post-footer']}>
          <div className={styles['post-reaction']}>
            <button
              type="button"
              className={likeClass}
              onClick={likeClickHandler}
            >
              <span className="a11y-hidden">좋아요 버튼</span>
              <span className={styles['like-count']}>{likeCount}</span>
            </button>
            <div className={styles['comment']} onClick={commentClick}>
              <span className="a11y-hidden">댓글 쓰러가기 버튼</span>
              <span className={styles['comment-count']}>
                {data['commentCount']}
              </span>
            </div>
          </div>
          <span className={styles['create-date']}>{formattedDate}</span>
        </div>
        <button
          className={styles['btn-post-more']}
          type="button"
          onClick={moreInfoAction}
        >
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
