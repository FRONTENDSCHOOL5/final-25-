import React from 'react';
import styles from './JoinEmail.module.css';
import { useForm } from 'react-hook-form';

export default function JoinEmail({
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

  return (
    <main>
      <h1 className={styles['email-header']}>이메일로 회원가입</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 이메일 인풋 */}
        <div className={styles['input-wrapper']}>
          <label htmlFor="email" className={styles['input-title']}>
            이메일
          </label>
          <input
            id="email"
            type="text"
            name="email"
            placeholder="이메일 주소를 입력해주세요."
            className={styles['input']}
            aria-invalid={
              !isDirty ? undefined : errors.email ? 'true' : 'false'
            }
            {...register('email', {
              required: '이메일은 필수 입력입니다.',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: '이메일 형식에 맞지 않습니다.',
              },
            })}
          />
          {errors.email && (
            <small className={styles['error-message']} role="alert">
              {errors.email.message}
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
            name="password"
            placeholder="비밀번호를 입력해주세요."
            className={styles['input']}
            aria-invalid={
              !isDirty ? undefined : errors.password ? 'true' : 'false'
            }
            {...register('password', {
              required: '비밀번호는 필수 입력입니다.',
              minLength: {
                value: 6,
                message: '비밀번호는 6자리 이상 사용하세요.',
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
          disabled={isSubmitting || !isFormValid} // 유효성 검사를 통과하지 않으면 버튼 비활성화
          className={`${styles['submit-btn']} ${
            isFormValid ? styles['submit-btn-active'] : ''
          }`}
          type="submit"
        >
          다음
        </button>
      </form>
    </main>
  );
}
