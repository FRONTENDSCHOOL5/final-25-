import React from 'react';
import styles from './ChatList.module.css';
import Header from '../../../components/common/Header/Header';
import TabMenu from '../../../components/common/TabMenu/TabMenu';
import ProfileImg from '../../../assets/images/profile-img42.png';
import ChatItem from '../../../components/common/Chat/ChatItem';

export default function ChatList() {
  const chats = [
    {
      id: 1,
      name: '애월읍 냠냠이',
      message: '지금 배고픈데.. 드실?',
      date: '2020.10.25',
      profileImg: { ProfileImg },
    },
    {
      id: 2,
      name: '애월읍 쩝쩝이',
      message: '오늘 갬성은 탕슉',
      date: '2020.10.23',
      profileImg: { ProfileImg },
    },
    {
      id: 3,
      name: '애월읍 호로록',
      message: '호로록....',
      date: '2020.11.10',
      profileImg: { ProfileImg },
    },
    {
      id: 4,
      name: '애월읍 통통이',
      message: '오늘은 다이어트해야하는데... 라면 고?',
      date: '2020.11.10',
      profileImg: { ProfileImg },
    },
  ];
  return (
    <div>
      {/* 헤더 부분 */}
      <header>
        <h1 className={styles['a11y-hidden']}>채팅방 목록</h1>
        <Header />
      </header>

      {/* 메인 부분 */}
      <main>
        <ul className={styles['chat-list']}>
          {chats.map(chat => (
            <ChatItem key={chat.id} chat={chat} />
          ))}
        </ul>
      </main>

      {/* 하단탭메뉴 부분 */}
      <footer>
        <TabMenu />
      </footer>
    </div>
  );
}
