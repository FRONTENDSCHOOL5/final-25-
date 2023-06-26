import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import styles from './JoinProfileSettiong.module.css';
import BasicProfile from '../../../assets/images/basic-profile-img.png';
import { useLocation, useNavigate } from 'react-router-dom';
import userAPI from '../../../api/userAPI';
import imageAPI from '../../../api/imageAPI';

export default function JoinProfileSetting() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
    setValue,
    watch,
  } = useForm({ mode: 'onBlur' });

  const [isFormValid, setIsFormValid] = useState(true);
  console.log('isFormValid:', isFormValid);

  const [profileImg, setProfileImg] = useState(null);
  const profileInputRef = useRef(null);

  const userName = watch('userNameInput');
  const accountName = watch('idInput');
  const intro = watch('introduceInput');

  const handleIdChange = async event => {
    const accountName = event.target.value;
    await checkAccount({ accountname: accountName });
  };

  // join 페이지에서 navigate로 보낸 값을 여기서 받아서 씀
  const location = useLocation();
  const joinData = location.state;
  console.log('joinData밖에:', joinData);

  // 이미지 저장 api
  const handleImageChange = async event => {
    const imageSrc = await imageAPI.uploadImg(event);

    setProfileImg(imageSrc);
    console.log('profileImg: ', profileImg);
  };

  // ----------------- 계정 ID 중복검사 api-----------------
  const checkAccount = async accountData => {
    console.log('중복검사 확인');
    try {
      const accountName = accountData.accountname;
      const response = await userAPI.checkAccountValid(accountName);
      console.log(response.message);

      if (response.message === '사용 가능한 계정ID 입니다.') {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    } catch (error) {
      console.log(error);
      setIsFormValid(false);
      alert('계정 ID가 중복됩니다.');
    }
  };

  // -----------------최종 등록하는 api-----------------
  const onSubmit = async data => {
    console.log('joinData : ', joinData);
    console.log('userName :', userName);
    try {
      const response = await userAPI.getSignUp(
        userName,
        joinData.email,
        joinData.password,
        accountName,
        intro,
        profileImg,
      );
      console.log(response.message);

      if (response.message === '회원가입 성공') {
        // 뭘가져가야할지 한번 더 체크하고  state로 넘길 수 있음
        navigate('/');
      } else {
        setIsFormValid(false);
      }
    } catch (error) {
      console.error(error);
      setIsFormValid(false);
      alert('프로필 설정에 실패하였습니다.');
    }
  };

  return (
    <article className={styles['join-profile-main']}>
      <h1 className={styles['header']}>프로필 설정</h1>
      <p className={`${styles['header']} ${styles['sub-title']}`}>
        나중에 언제든지 변경할 수 있습니다.
      </p>
      {/* ----------------- 프로필 사진 넣는 곳 -----------------*/}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles['profile-img-wrapper']}>
          <label htmlFor="profile" className="a11y-hidden">
            <input
              id="profile"
              type="file"
              accept="image/jpg, image/jpeg, image/png"
              ref={profileInputRef}
              onChange={handleImageChange}
            />
          </label>
          <button
            className={styles['img-button']}
            type="button"
            onClick={() => profileInputRef.current.click()}
          >
            <img
              className={styles['profile-img']}
              src={profileImg || BasicProfile}
              alt="프로필 사진"
            />
          </button>
        </div>

        <section>
          {/*----------------- 사용자 이름 입력----------------- */}
          <div className={styles['input-wrapper']}>
            <label className={styles['input-title']} htmlFor={'userNameInput'}>
              사용자 이름
            </label>
            <input
              type="text"
              id="userNameInput"
              name="userNameInput"
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
              defaultValue=""
            />
            {errors.userNameInput && (
              <small className={styles['error-message']} role="alert">
                {errors.userNameInput.message}
              </small>
            )}
          </div>
          {/* -----------------계정 ID 입력----------------- */}
          <div className={styles['input-wrapper']}>
            <label className={styles['input-title']} htmlFor="idInput">
              계정 ID
            </label>
            <input
              type="text"
              id="idInput"
              name="idInput"
              placeholder="영문, 숫자, 밑줄 및 마침표만 사용 가능합니다."
              // className={styles['input']}
              className={`${styles['input']} ${
                !isFormValid ? styles['input-error'] : ''
              }`}
              aria-invalid={errors.idInput && !isFormValid ? 'true' : 'false'}
              onInput={handleIdChange}
              onBlur={checkAccount}
              {...register('idInput', {
                required: '*계정 ID는 필수 입력입니다.',
                pattern: {
                  value: /^[a-zA-Z0-9._]+$/,
                  message: '*영문, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.',
                },
              })}
              defaultValue=""
            />
            {!isFormValid && (
              <small className={styles['error-message']} role="alert">
                *이미 사용중인 ID입니다.
              </small>
            )}
            {errors.idInput && (
              <small className={styles['error-message']} role="alert">
                {errors.idInput.message}
              </small>
            )}
          </div>
          {/*----------------- 소개 입력 -----------------*/}
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
          {/*----------------- 버튼 -----------------*/}
          <button
            className={`${styles['submit-btn']} ${
              Object.keys(errors).length === 0
                ? styles['submit-btn-active']
                : styles['submit-btn-disabled']
            }`}
            type="submit"
            disabled={Object.keys(errors).length > 0}
          >
            먹을 사람 시작하기
          </button>
        </section>
      </form>
    </article>
  );
}
