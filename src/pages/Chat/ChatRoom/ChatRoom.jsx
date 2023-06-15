import React from 'react';
import styles from './ChatRoom.module.css';
import Header from '../../../components/common/Header/ChatHeader';
import sendedphoto from '../../../assets/images/pofileproduct.png';

export default function ChatRoom() {
  return (
    <>
      <Header />
      <main className={styles.chatroom}>
        {/* <h2 className={styles['a11y-hidden']}>채팅방</h2> */}
        <ul className={`${styles['received']} ${styles['first']}`}>
          <li className={styles['received-chat']}>
            옷을 인생을 그러므로 없으면 것은 이상은 것은 우리의 위하여, 뿐이다.
            이상의 청춘의 뼈 따뜻한 그들의 그와 약동하다. 대고, 못할 넣는
            풍부하게 뛰노는 인생의 힘있다.
          </li>
          <time className={styles['received-time']}>12:39</time>
        </ul>
        <ul className={styles.received}>
          <li className={styles['received-chat']}>
            안녕하세요. 감귤 사고싶어요요요요요
          </li>
          <time className={styles['received-time']}>12:41</time>
        </ul>
        <ul className={styles.sended}>
          <time className={styles['sended-time']}>12:50</time>
          <li className={styles['sended-chat']}>네 말씀하세요.</li>
        </ul>
        <ul className={styles.sended}>
          <time className={styles['sended-time']}>12:50</time>
          <li className={styles['sended-photo-wrap']}>
            <img
              className={styles['sended-photo']}
              src={sendedphoto}
              alt="보낸사진"
            />
          </li>
        </ul>
      </main>
    </>
  );
}
