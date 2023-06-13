import React from 'react';
import styles from './AddProduct.module.css';
import BackIcon from '../../assets/images/icon-arrow-left.svg';

export default function AddProduct() {
  return (
    <>
      <section className={styles['ProductWrapper']}>
        <article className={styles['ProductMain']}>
          <div className={styles['ProductHeader']}>
            <div className={styles['ProductArrow']}>
              <a href="/">
                <img
                  className={styles['BackIcon']}
                  src={BackIcon}
                  alt="뒤로가기 아이콘 입니다."
                />
              </a>
            </div>

            <button className={styles['ProductBtn']}>저장</button>
          </div>
          <div className={styles['ProductBody']}>
            <div className={styles['ProductImageBox']}>
              <div>이미지 등록</div>
              <label className={styles['fileLabel']} for="Input"></label>
              <input className={styles['fileInput']} type="file" id="Input" />
            </div>

            <div className={styles['ProductTitle']}>
              <div>공구 이름</div>
              <input
                className={styles['ProductTitleInput']}
                type="text"
                placeholder="2~15자 이내여야 합니다."
              />
            </div>
            <div className={styles['ProductTitle']}>
              <div>가격</div>
              <input
                className={styles['ProductTitleInput']}
                type="number"
                placeholder="숫자만 입력 가능합니다."
              />
            </div>
            <div className={styles['ProductTitle']}>
              <div>판매링크</div>
              <input
                className={styles['ProductTitleInput']}
                type="text"
                placeholder="URL을 입력해 주세요"
              />
            </div>
          </div>
        </article>
      </section>
    </>
  );
}
