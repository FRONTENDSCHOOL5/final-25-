import React, { useState, useContext, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import styles from './ProfileModification.module.css';
import Layout from '../../components/layout/Layout';
import BasicProfile from '../../assets/images/basic-profile-img.png';
import userAPI from '../../api/userAPI';
import imageAPI from '../../api/imageAPI';
import profileAPI from '../../api/profileAPI2';

export default function ProfileModification() {
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);
  const Token = user.token;

  // 유효성 검토 후 제출 여부를 컨트롤
  const [isFormValid, setIsFormValid] = useState(true);
  const [btnState, setBtnstate] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
    setValue,
    watch,
  } = useForm({ mode: 'onBlur' });

  const [profileImg, setProfileImg] = useState(null);
  const profileInputRef = useRef(null);

  // ----------------- 서버에 저장된 유저 정보 호출 api-----------------
  useEffect(() => {
    const getUserInfo = async () => {
      const Data = await userAPI.getMyInfo(Token);
      setValue('userNameInput', Data.user.username);
      setProfileImg(Data.user.image || BasicProfile);
      setValue('idInput', Data.user.accountname);
      setValue('introduceInput', Data.user.intro);
    };
    console.log('서버로 받은 데이터 확인중');
    getUserInfo();
  }, [Token, setValue]);

  // 계정  ID 바뀌면 api 연결을 위해 업데이트
  const handleIdChange = async event => {
    const userId = event.target.value;
    setValue('idInput', userId);
    await checkAccount({ accountname: userId }); // ID가 변경될 때마다 중복검사를 수행합니다.
    console.log(' id확인 api 연결확인');
  };

  // -----------------이미지 저장 api-----------------
  const onImageChangeHandler = async event => {
    const imageSrc = await imageAPI.uploadImg(event);

    console.log('이미지 확인중: ', imageSrc);
    setProfileImg(imageSrc);
  };

  // 이미지 업로드 버튼 클릭 시 input 요소 클릭 이벤트 트리거
  const handleUploadClick = () => {
    profileInputRef.current.click();
  };

  // ----------------- 계정 ID 중복검사 api-----------------
  const checkAccount = async data => {
    console.log('계정id 중복검사');
    try {
      const accountName = data.accountname;
      const response = await userAPI.checkAccountValid(accountName);
      console.log('계정 ID 통신결과: ', response.message);

      if (response.message === '사용 가능한 계정ID 입니다.') {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    } catch (error) {
      console.log(error);
      setIsFormValid(true);
      alert('계정 ID가 중복됩니다.');
    }
  };

  // ----------------- 수정된 정보 등록하는 api-----------------
  const onSubmit = async data => {
    const { userNameInput, idInput, introduceInput } = data;
    console.log('수정 정보 확인', profileImg);
    const response = await profileAPI.putModifyData(
      userNameInput,
      idInput,
      introduceInput,
      profileImg,
      Token,
    );
    console.log('수정된 정보 : ', response);
    // 수정된 정보를 로컬스토리지에도 업데이트
    const changeAccount = {
      token: Token,
      accountname: response.user.accountname,
    };
    localStorage.setItem('accountname', response.user.accountname);
    dispatch({ type: 'login', payload: changeAccount });
    // navigate(`/profile/${response.user.accountname}`);
    navigate(`/profile`);
    // navigate(`/profile/m`);
  };

  //버튼 활성화
  const handler = () => {
    const { userNameInput, idInput, introduceInput } = watch();
    if (
      userNameInput !== '' &&
      idInput !== '' &&
      introduceInput !== '' &&
      profileImg !== null &&
      isFormValid
    ) {
      setBtnstate(true);
      return true;
      // 모두 유효하면 버튼 상태를 true로 설정
    } else {
      setBtnstate(false);
      return false;
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Layout btnHandler={handler} btn={btnState}>
        {/* ----------------- 프로필 사진 넣는 곳 -----------------*/}
        <article className={styles['profile-m-main']}>
          <div className={styles['profile-img-wrapper']}>
            <label htmlFor="profile" className="a11y-hidden">
              <input
                id="profile"
                type="file"
                accept="image/jpg, image/jpeg, image/png"
                onChange={onImageChangeHandler}
                ref={profileInputRef}
              />
            </label>
            <button
              className={styles['img-button']}
              type="button"
              onClick={handleUploadClick}
            >
              <img
                className={styles['profile-img']}
                src={profileImg || BasicProfile}
                alt="프로필 사진"
              />
            </button>
          </div>

          {/*----------------- 사용자 이름 입력----------------- */}
          <section>
            <div className={styles['input-wrapper']}>
              <label
                className={styles['input-title']}
                htmlFor={'userNameInput'}
              >
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
                className={`${styles['input']} ${
                  !isFormValid ? styles['input-error'] : ''
                }`}
                aria-invalid={
                  !isDirty ? undefined : errors.idInput ? 'true' : 'false'
                }
                onInput={handleIdChange}
                onBlur={handleSubmit(checkAccount)}
                {...register('idInput', {
                  required: '계정 ID는 필수 입력입니다.',
                  pattern: {
                    value: /^[a-zA-Z0-9._]+$/,
                    message:
                      '*영문, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.',
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
                  !isDirty
                    ? undefined
                    : errors.introduceInput
                    ? 'true'
                    : 'false'
                }
                {...register('introduceInput', {
                  required: '소개 필수 입력입니다.',
                })}
              />
            </div>
          </section>
        </article>
      </Layout>
    </form>
  );
}
