import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './JoinProfileSettiong.module.css';
import BasicProfile from '../../../assets/images/basic-profile-img.png';
import ImgButton from '../../../assets/images/img-button.png';
import { useLocation, useNavigate } from 'react-router-dom';

export default function JoinProfileSetting({
  onSubmit = async data => {
    await new Promise(r => setTimeout(r, 1000));
    alert(JSON.stringify(data));
  },
}) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
  } = useForm();

  const isFormValid = isDirty && Object.keys(errors).length === 0;
  // join 페이지에서 navigate로 보낸 값을 여기서 받아서 씀
  const location = useLocation();
  const data = location.state;
  console.log('data:', data);

  return (
    <main>
      <h1 className={styles['header']}>프로필 설정</h1>
      <p className={`${styles['header']} ${styles['sub-title']}`}>
        나중에 언제든지 변경할 수 있습니다.
      </p>
      {/* 프로필 사진 넣는 곳 */}
      <div className={styles['profile-img-wrapper']}>
        <img
          className={styles['profile-img']}
          type="file"
          src={BasicProfile}
          alt="프로필 사진"
        />
        <button className={styles['img-button']}>
          <img src={ImgButton} alt="사진추가 버튼" />
        </button>
      </div>
      <section>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* 사용자 이름 입력 */}
          <div className={styles['input-wrapper']}>
            <label className={styles['input-title']} htmlFor={'userNameInput'}>
              사용자 이름
            </label>
            <input
              type="text"
              id="userNameInput"
              placeholder="2~10자 이내여야 합니다."
              className={styles['input']}
              aria-invalid={
                !isDirty ? undefined : errors.userNameInput ? 'true' : 'false'
              }
              {...register('userNameInput', {
                required: '사용자 이름은 필수 입력입니다.',
                minLength: {
                  value: 2,
                  message: '*사용자 이름은 2자리 이상이여야 합니다.',
                },
                maxLength: {
                  value: 10,
                  message: '*사용자 이름은 10자리 이내여야 합니다.',
                },
              })}
            />
            {errors.userNameInput && (
              <small className={styles['error-message']} role="alert">
                {errors.userNameInput.message}
              </small>
            )}
          </div>
          {/* 계정 ID 입력 */}
          <div className={styles['input-wrapper']}>
            <label className={styles['input-title']} htmlFor="idInput">
              계정 ID
            </label>
            <input
              type="text"
              id="idInput"
              placeholder="영문, 숫자, 밑줄 및 마침표만 사용 가능합니다."
              className={styles['input']}
              aria-invalid={
                !isDirty ? undefined : errors.idInput ? 'true' : 'false'
              }
              {...register('idInput', {
                required: '계정 ID는 필수 입력입니다.',
                pattern: {
                  value: /^[a-zA-Z0-9._]+$/,
                  message: '*영문, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.',
                },
              })}
            />
            {errors.idInput && (
              <small className={styles['error-message']} role="alert">
                {errors.idInput.message}
              </small>
            )}
          </div>
          {/* 소개 입력 */}
          <div className={styles['input-wrapper']}>
            <label className={styles['input-title']} htmlFor="introduceInput">
              소개
            </label>
            <input
              type="text"
              id="introduceInput"
              placeholder="자신에 대해 자세히 소개해주세요!"
              className={styles['input']}
              aria-invalid={
                !isDirty ? undefined : errors.introduceInput ? 'true' : 'false'
              }
              {...register('introduceInput', {
                required: '소개 필수 입력입니다.',
              })}
            />
          </div>
          {/* 버튼 */}
          <button
            disabled={isSubmitting || isFormValid} // 유효성 검사를 통과하지 않으면 버튼 비활성화
            className={`${styles['submit-btn']} ${
              isFormValid ? styles['submit-btn-active'] : ''
            }`}
            type="submit"
          >
            먹을사람 시작하기
          </button>
        </form>
      </section>
    </main>
  );
}
