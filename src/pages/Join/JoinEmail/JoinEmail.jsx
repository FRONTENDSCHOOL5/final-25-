import React from 'react';
import styles from './JoinEmail.module.css';

export default function JoinEmail() {
  return (
    <>
      <section className={styles['EmailWrapper']}>
        <article className={styles['EmailMain']}>
          <h1 className={styles['EmailHeader']}>이메일로 회원가입</h1>
          <form action="">
            <div className={styles['EmailInput-container']}>
              <div className={styles['Emailfont']}>이메일</div>
              <label className={styles['a11y-hidden']} htmlFor={'email'}>
                Username:
              </label>
              <input
                type="emailInput"
                id="email"
                name="email"
                placeholder="이메일 주소를 입력해주세요."
                className={styles['EmailInput']}
              />
            </div>
            <div className={styles['PwInput-container']}>
              <div className={styles['Pwfont']}>비밀번호 </div>
              <label className={styles['a11y-hidden']} htmlFor="password">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder=" 비밀번호를 입력해주세요."
                className={styles['PwInput']}
              />
            </div>
            <div className={styles['Warning']}>
              *비밀번호는 6자 이상이여야 합니다.
            </div>
            <button className={styles['SubmitBtn']} type="submit">
              다음
            </button>
          </form>
        </article>
      </section>
    </>
  );
}
