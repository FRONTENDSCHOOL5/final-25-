import React from 'react';
import styles from './Upload.module.css';
import Header from '../../components/common/Header/Header';

function Upload() {
  return (
    <>
      <Header />
      <section>
        <h1 className="a11y-hidden">게시물 작성</h1>
        <article className={`${styles['title-wrap']} ${styles['line']}`}>
          <div className={styles['title-inner']}>저녁 같이 먹을 사람?</div>
        </article>
        <article>
          <textarea
            className={styles['text-box']}
            placeholder=" 용용선생에서 마라전골 같이 드실 분?  0/50자"
            cols="15"
            rows="6"
            maxLength="50"
            max="50"
          ></textarea>
        </article>
        <article>
          <ul className={styles['items-wrap']}>
            <li className={`${styles['item-menu']} ${styles['item-all']}`}>
              메뉴
              <div className={styles['item-input']}>용용선생 마라전골</div>
            </li>
            <li className={`${styles['item-people']} ${styles['item-all']}`}>
              인원
              <div
                className={`${styles['people-wrap']} ${styles['item-input']}`}
              >
                <button
                  type="button"
                  className={`${styles['btn-people']} ${styles['minus']}`}
                ></button>
                2명
                <button
                  type="button"
                  className={`${styles['btn-people']} ${styles['plus']}`}
                ></button>
              </div>
            </li>
            <li className={`${styles['item-date']} ${styles['item-all']}`}>
              날짜
              <div className={styles['item-input']}>2023.06.23 오후 06시</div>
            </li>
            <li className={`${styles['item-place']} ${styles['item-all']}`}>
              장소
              <div className={styles['item-input']}>위니브 앞</div>
            </li>
          </ul>
        </article>
        <article className={styles['photo']}>
          <div className={styles['photo-item']}>
            <img
              src={'https://picsum.photos/200'}
              className={styles['photo-img']}
              alt=""
            />
            <button type="button" className={styles['btn-close']}></button>
          </div>
        </article>
        <div className={styles['btn-photo']}>
          <input
            type="file"
            id="btn-photo-input"
            className={styles['btn-photo-input']}
          />
          <label
            htmlFor="btn-photo-input"
            className={styles['btn-photo-label']}
          ></label>
        </div>
        <p className={styles['upload-photo']}></p>
      </section>
    </>
  );
}

export default Upload;
