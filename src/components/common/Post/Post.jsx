import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Post.module.css';

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

  // 게시글 하단 작성 일자
  const formattedCreateDate = formatCreateDate(data['createdAt']);
  function formatCreateDate(dateString) {
    const currentDate = new Date();
    const targetDate = new Date(dateString);

    const diffInDays = Math.floor(
      (currentDate - targetDate) / (1000 * 60 * 60 * 24),
    );

    if (diffInDays < 1) {
      const diffInHours = Math.floor(
        (currentDate - targetDate) / (1000 * 60 * 60),
      );

      if (diffInHours < 1) {
        const diffInMinutes = Math.floor(
          (currentDate - targetDate) / (1000 * 60),
        );
        return `${diffInMinutes}분 전`;
      } else {
        return `${diffInHours}시간 전`;
      }
    } else if (diffInDays === 1) {
      return '어제';
    } else {
      const year = targetDate.getFullYear();
      const month = String(targetDate.getMonth() + 1).padStart(2, '0');
      const day = String(targetDate.getDate()).padStart(2, '0');
      return `${year}년 ${month}월 ${day}일`;
    }
  }

  const contentTxt = data['content'];
  const regex = /\{(.+?)\}/;
  // 예외처리 필요
  const match = contentTxt?.match(regex);
  const foundText = match ? match[0] : null;
  const planContents = foundText ? JSON.parse(foundText) : null;

  // 게시글 내 일정 > 일시
  const formattedPlanDate =
    planContents && formatPlanDate(planContents['date']);
  function formatPlanDate(date) {
    // '시'가 포함되어 있으면 그냥 return
    if (date.includes('시')) {
      return date;
    }

    const currentDate = new Date();
    const targetDate = new Date(date);

    const isToday = currentDate.toDateString() === targetDate.toDateString();

    if (isToday) {
      const hours = targetDate.getHours();
      const minutes = targetDate.getMinutes();
      return `오늘, ${hours}시 ${minutes}분`;
    } else {
      const tomorrow = new Date(currentDate);
      tomorrow.setDate(currentDate.getDate() + 1);

      const isTomorrow = tomorrow.toDateString() === targetDate.toDateString();

      if (isTomorrow) {
        const hours = targetDate.getHours();
        const minutes = targetDate.getMinutes();
        return `내일, ${hours}시 ${minutes}분`;
      } else {
        const month = String(targetDate.getMonth() + 1).padStart(2, '0');
        const day = String(targetDate.getDate()).padStart(2, '0');
        const hours = targetDate.getHours();
        const minutes = targetDate.getMinutes();
        return `${month}/${day} ${hours}시 ${minutes}분`;
      }
    }
  }

  // ===== 이미지 리스트 생성
  const [imageList, setImageList] = useState([]);
  const [isImage, setIsImage] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 버튼 클릭 이벤트
  const handleImageControlClick = (event, index) => {
    setCurrentImageIndex(index);
    const imageContainer = event.target.parentElement.closest('div').firstChild;
    const translateXValue = -309 * index;
    imageContainer.style.transform = `translateX(${translateXValue}px)`;
    imageContainer.style.transition = 'transform 0.5s'; // 트랜지션 효과 설정
  };

  useEffect(() => {
    if (data['image'] !== '') {
      setIsImage(true);
      setImageList(data['image'].split(','));
    }
  }, [data['image']]);

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
                  {formattedPlanDate}
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

          {isImage ? (
            <div className={styles['post-img-container']}>
              <ul
                className={styles['post-img-list']}
                style={{
                  transform: `translateX(${-309 * currentImageIndex}px)`,
                }}
              >
                {imageList.map((imageUrl, index) => (
                  <li key={index} className={styles['on']}>
                    <img src={imageUrl} alt={`음식 사진 ${index + 1}`} />
                  </li>
                ))}
              </ul>
              {imageList.length > 1 && (
                <ul className={styles['post-img-control']}>
                  {imageList.map((_, index) => (
                    <li key={index}>
                      <button
                        className={
                          index === currentImageIndex ? styles['on'] : ''
                        }
                        type="button"
                        onClick={event => handleImageControlClick(event, index)}
                      ></button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <></>
          )}
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
          <span className={styles['create-date']}>{formattedCreateDate}</span>
        </div>
        <button
          className={styles['btn-post-more']}
          type="button"
          onClick={moreInfoAction}
        >
          <span className="a11y-hidden">포스트 메뉴</span>
        </button>
      </article>
    </>
  );
}
