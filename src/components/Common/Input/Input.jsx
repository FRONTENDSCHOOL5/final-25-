import React, { useState } from 'react';
import styles from './Input.module.css';
import profileImg from '../../../assets/images/profile-img42.png';

export default function Input({ type }) {
  const [inputValue, setInputValue] = useState('');

  const handleInput = event => {
    setInputValue(event.target.value);
  };

  const InputUI = {
    comment: {
      id: 'inputComment',
      labelTxt: '댓글 입력',
      placeholder: '댓글 입력하기...',
      inputClassName: styles['input-comment'],
      btnTxt: '게시',
      btnClassName: inputValue === '' ? styles['btn-add'] : `${styles['btn-add']} ${styles['on']}`,
    },
    chat: {
      id: 'inputMessage',
      labelTxt: '메시지 입력',
      placeholder: '메시지 입력하기...',
      inputClassName: styles['input-message'],
      btnTxt: '전송',
      btnClassName: inputValue === '' ? styles['btn-add'] : `${styles['btn-add']} ${styles['on']}`,
    },
  };

  return (
    <>
      <div className={styles['input']}>
        <img className={styles['profile-cover']} src={profileImg} alt="프로필 이미지" />
        <label htmlFor={InputUI[type]['inputComment']} className="a11y-hidden">
          {InputUI[type]['labelTxt']}
        </label>
        <input type="text" placeholder={InputUI[type]['placeholder']} id={InputUI[type]['id']} className={InputUI[type]['inputClassName']} onChange={handleInput} />
        <button className={InputUI[type]['btnClassName']} type="button">
          {InputUI[type]['btnTxt']}
        </button>
      </div>
    </>
  );
}
