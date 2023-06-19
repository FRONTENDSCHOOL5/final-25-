import React from 'react';
import styles from './ChatList.module.css';
import ProfileImg from '../../../assets/images/profile-img42.png';
import ChatItem from '../../../components/common/Chat/ChatItem';
import Layout from '../../../components/layout/Layout';

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
    <Layout>
      <h1 className="a11y-hidden">채팅목록</h1>
      <div className={styles['main-top']}>
        <ul className={styles['chat-list']}>
          {chats.map(chat => (
            <ChatItem key={chat.id} chat={chat} />
          ))}
        </ul>
      </div>
    </Layout>
  );
}
