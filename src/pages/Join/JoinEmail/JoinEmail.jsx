import React, { useState } from 'react';
import styles from './JoinEmail.module.css';
import { useForm } from 'react-hook-form';
import userAPI from '../../../api/userAPI';
import { useNavigate } from 'react-router-dom';

export default function JoinEmail() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
    setValue,
    trigger,
  } = useForm({ mode: 'onBlur' });

  const [isEmailValid, setIsEmailValid] = useState(true);

  const handleEmailChange = event => {
    const email = event.target.value;
    setValue('email', email);
  };

  const handleEmailBlur = async () => {
    await trigger('email');
  };

  const onSubmit = async data => {
    try {
      const email = data.email;
      const response = await userAPI.checkEmailValid(email);
      console.log(response.message);

      if (response.message === '사용 가능한 이메일 입니다.') {
        navigate('/join/profile', {
          state: {
            email: data.email,
            password: data.password,
          },
        });
      } else {
        setIsEmailValid(false);
      }
    } catch (error) {
      console.error(error);
      setIsEmailValid(true);
      alert('회원가입에 실패하였습니다.');
    }
  };

  return (
    <section className={styles['join-main']}>
      <h1 className={styles['email-header']}>이메일로 회원가입</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 이메일 인풋 */}
        <div className={styles['input-wrapper']}>
          <label htmlFor="email" className={styles['input-title']}>
            이메일
          </label>
          <input
            id="email"
            type="email"
            placeholder="이메일 주소를 입력해주세요."
            className={styles['input']}
            aria-invalid={!errors.email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur} // 수정: onBlur 이벤트 핸들러 추가
            {...register('email', {
              required: '*이메일은 필수 입력입니다.',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: '*이메일 형식에 맞지 않습니다.',
              },
            })}
          />
          {errors.email && (
            <small className={styles['error-message']} role="alert">
              {errors.email.message}
            </small>
          )}
          {!isEmailValid && (
            <small className={styles['error-message']} role="alert">
              *이미 사용 중인 이메일입니다.
            </small>
          )}
        </div>

        {/* 패스워드 인풋*/}
        <div className={styles['input-wrapper']}>
          <label className={styles['input-title']} htmlFor="password">
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            className={styles['input']}
            aria-invalid={!errors.password}
            {...register('password', {
              required: '*비밀번호는 필수 입력입니다.',
              minLength: {
                value: 6,
                message: '*비밀번호는 6자리 이상 사용하세요.',
              },
            })}
          />
          {errors.password && (
            <small className={styles['error-message']} role="alert">
              {errors.password.message}
            </small>
          )}
        </div>
        {/* 버튼 */}
        <button
          className={`${styles['submit-btn']} ${
            !isDirty || Object.keys(errors).length > 0
              ? styles['submit-btn-disabled']
              : styles['submit-btn-active']
          }`}
          type="submit"
          disabled={!isDirty || Object.keys(errors).length > 0}
        >
          다음
        </button>
      </form>
    </section>
  );
}
