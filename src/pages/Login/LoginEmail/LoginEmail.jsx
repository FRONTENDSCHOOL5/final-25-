import React, { useState } from 'react';
import styles from './LoginEmail.module.css';
import { useNavigate, Link } from 'react-router-dom';
import userAPI from '../../../api/userAPI';

export default function LoginEmail() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [warningMessage, setWarningMessage] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = e => {
    if (e.target.type === 'email') {
      setEmail(e.target.value);
      if (e.target.value.trim() === '') {
        setWarningMessage('');
      } else if (validateEmail(e.target.value)) {
        setWarningMessage('');
      } else {
        setWarningMessage('*올바른 이메일 형식이 아닙니다.');
      }
    }
  };
  const handlePasswordChange = e => {
    if (e.target.type === 'password') {
      setPassword(e.target.value);
      if (e.target.value.trim() === '') {
        setWarningMessage('');
      } else if (e.target.value.length < 6) {
        setWarningMessage('*비밀번호는 6자리 이상이어야 합니다.');
      } else {
        setWarningMessage('');
      }
    }
  };
  const validateEmail = email => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  function myStyle() {
    const inlineStyle = {
      backgroundColor: '#7D4B0F',
    };
    return inlineStyle;
  }

  const handleSubmit = async e => {
    e.preventDefault();
    // 폼 제출 논리 구현
    try {
      const result = await userAPI.getLogin(email, password);
      setWarningMessage(result.message);
      if (result.user) {
        console.log(result);
        localStorage.setItem('token', result.user.token);
        localStorage.setItem('username', result.user.username);
        localStorage.setItem('accountname', result.user.accountname);
        // 페이지 이동!!
        navigate('/');
      } else {
        setWarningMessage('*이메일과 비밀번호가 일치하지 않습니다.');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <section className={styles['login-main']}>
        <h1 className={styles['login-main-head']}>로그인</h1>
        <form onSubmit={handleSubmit}>
          <article className={styles['login-main-input']}>
            <span className={styles['login-font']}>이메일</span>
            <label className="a11y-hidden" htmlFor={'email'}></label>
            <input
              type="email"
              id="email"
              name="email"
              className={styles['login-input']}
              value={email}
              onChange={handleEmailChange}
            />
          </article>
          <article className={styles['login-main-input']}>
            <span className={styles['login-font']}>비밀번호 </span>
            <label className="a11y-hidden" htmlFor="password"></label>
            <input
              type="password"
              id="password"
              name="password"
              className={styles['login-input']}
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </article>
          {warningMessage && (
            <article className={styles['login-message-warning']}>
              <p>{warningMessage}</p>
            </article>
          )}
          {email && password ? (
            <button
              className={styles['submit-btn']}
              type="submit"
              style={myStyle()}
            >
              로그인
            </button>
          ) : (
            <button className={styles['submit-btn']} type="submit" disabled>
              로그인
            </button>
          )}
        </form>
        <Link className={styles['login-join']} to="/join">
          이메일로 회원가입
        </Link>
      </section>
    </>
  );
}
