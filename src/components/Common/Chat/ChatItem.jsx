import React from 'react';
import styles from './ChatItem.module.css';
import ProfileImg from '../../../assets/images/basic-profile-img.png';

export default function ChatItem({ chat }) {
  return (
    <li className={styles['chatItem']}>
      <div className={styles['chatInfo']}>
        <div className={styles['profileImgWrapper']}>
          <img
            className={styles['profileImg']}
            src={ProfileImg}
            alt="프로필 이미지"
          />
          {/*나중에 이즈메시지 동작되게끔 다시 확인 필요 */}
          {/* {isNewMessage && <div className={styles.newMessageDot}></div>} */}
        </div>
        <div className={styles['chat-content']}>
          <h2 className={styles['chat-name']}>{chat.name}</h2>
          <p className={styles['chat-message']}>{chat.message}</p>
        </div>
      </div>
      <span className={styles['chat-date']}>{chat.date}</span>
    </li>
  );
}
