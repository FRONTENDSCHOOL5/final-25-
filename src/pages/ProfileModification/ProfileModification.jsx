import React from 'react';
import styles from './ProfileModification.module.css';
import Header from '../../components/common/Header/SaveButton';
import BasicProfile from '../../assets/images/basic-profile-img.png';
import ImgButton from '../../assets/images/img-button.png';

export default function ProfileModification() {
  return (
    <>
      <Header />
      <article className={styles['profile-wrapper']}>
        <h1 className={styles['a11y-hidden']}>프로필 수정</h1>

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
          </form>
        </section>
      </article>
    </>
  );
}
