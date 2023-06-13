import React from 'react';
import styles from './JoinProfileSettiong.module.css';
import BasicProfile from '../../../assets/images/basic-profile-img.png';
import ImgButton from '../../../assets/images/img-button.png';

export default function JoinProfileSetting() {
  return (
    <>
      <article className={styles['profile-wrapper']}>
        <h1 className={styles['header']}>프로필 설정</h1>
        <p className={`${styles['header']} ${styles['sub']}`}>
          나중에 언제든지 변경할 수 있습니다.
        </p>
        {/* 프로필 사진 넣는 곳 */}
        <div className={styles['profile-img-wrapper']}>
          <img
            className={styles['profile-img']}
            src={BasicProfile}
            alt="프로필 사진"
          />
          <button className={styles['img-button']}>
            <img src={ImgButton} alt="사진추가 버튼" />
          </button>
        </div>
        <section>
          <form action="">
            {/* 사용자 이름 입력 */}
            <div className={styles['name-input-wrapper']}>
              <h2 className={styles['input-title']}>사용자 이름</h2>
              <label
                className={styles['a11y-hidden']}
                htmlFor={'userNameInput'}
              >
                사용자 이름:
              </label>
              <input
                type="text"
                id="userNameInput"
                placeholder="2~10자 이내여야 합니다."
                className={styles['input']}
              />
            </div>
            {/* 계정 ID 입력 */}
            <div className={styles['id-input-wrapper']}>
              <div className={styles['input-title']}>계정 ID</div>
              <label className={styles['a11y-hidden']} htmlFor="idInput">
                계정 ID:
              </label>
              <input
                type="text"
                id="idInput"
                placeholder="영문, 숫자, 특수문자(.),(_)만 사용 가능합니다."
                className={styles['input']}
              />
              <p className={styles['warning']}>
                *영문, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.
              </p>
            </div>
            {/* 소개 입력 */}
            <div className={styles['introduce-wrapper']}>
              <div className={styles['input-title']}>소개</div>
              <label className={styles['a11y-hidden']} htmlFor="introduceInput">
                소개입력:
              </label>
              <input
                type="text"
                id="introduceInput"
                placeholder="자신에 대해 자세히 소개해주세요!"
                className={styles['input']}
              />
            </div>
            {/* 버튼 */}
            <button className={styles['submit-btn']} type="submit">
              먹을사람 시작하기
            </button>
          </form>
        </section>
      </article>
    </>
  );
}
