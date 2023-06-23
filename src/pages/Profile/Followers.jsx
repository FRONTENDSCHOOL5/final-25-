import React, { useState } from 'react';
import styles from './Followers.module.css';
import Layout from '../../components/layout/Layout';

export default function Followers() {
  const FollowersComponent = () => {
    const articles = [
      {
        id: 1,
        name: '애월읍 한라봉 최고 맛집',
        info: '정성을 다해 농사 짓는 한라봉',
      },
      {
        id: 2,
        name: '감귤의 품격 - 애월읍',
        info: '제주 노지귤, 하우스 한라봉 판매합니다라마바사아자',
      },
      {
        id: 3,
        name: '한라봉의 신',
        info: '30년 노하우로 정성스럽게 농사지은 노지 귤 판매합니다',
      },
    ];

    const [buttonText, setButtonText] = useState({
      1: '팔로우',
      2: '팔로우',
      3: '취소',
    });

    const [buttonClass, setButtonClass] = useState({
      1: styles['followers-btn-follow'],
      2: styles['followers-btn-follow'],
      3: styles['followers-btn-unfollow'],
    });

    const updateButtonState = id => {
      setButtonText(prevText => ({
        ...prevText,
        [id]: prevText[id] === '팔로우' ? '취소' : '팔로우',
      }));

      setButtonClass(prevClass => ({
        ...prevClass,
        [id]:
          prevClass[id] === styles['followers-btn-follow']
            ? styles['followers-btn-unfollow']
            : styles['followers-btn-follow'],
      }));
    };

    return (
      <Layout>
        <h2 className="a11y-hidden">팔로워목록</h2>
        <section className={styles['followers-list']}>
          {articles.map(article => (
            <article key={article.id} className={styles.followers}>
              <div className={styles['followers-photo']}></div>
              <p
                className={`${styles['followers-inner']} ${styles['followers-name']}`}
              >
                {article.name}
              </p>
              <p
                className={`${styles['followers-inner']} ${styles['followers-info']}`}
              >
                {article.info}
              </p>
              <button
                type="button"
                className={`${styles['followers-btn']} ${
                  buttonClass[article.id]
                }`}
                onClick={() => updateButtonState(article.id)}
              >
                {buttonText[article.id]}
              </button>
            </article>
          ))}
        </section>
      </Layout>
    );
  };

  return <FollowersComponent />;
}
