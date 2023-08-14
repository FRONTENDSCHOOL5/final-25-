import React, { useState, useContext, useEffect } from 'react';
import styles from './ChatList.module.css';
import ProfileImg from '../../../assets/images/profile-img42.png';
import Layout from '../../../components/layout/Layout';
import ChatItem from '../../../components/common/Chat/ChatItem';
import Modal from '../../../components/common/Modal/Modal';
import { AuthContext } from '../../../context/AuthContext';
import profileAPI from '../../../api/profileAPI2';

export default function ChatList() {
  const [isModalShow, setIsModalShow] = useState(false);
  const [modalMenu, setmodalMenu] = useState(['delete-post']);
  const [followers, setFollowers] = useState([]);
  const { user } = useContext(AuthContext);

  function modalOpen(menu) {
    setIsModalShow(true);
    setmodalMenu(menu);
  }

  function modalClose(event) {
    if (event.target === event.currentTarget) {
      setIsModalShow(false);
    }
  }

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await profileAPI.getFollowerList(
          user.token,
          user.accountname,
        );
        setFollowers(response);
        console.log('response 데이터 확인:', response);
      } catch (error) {
        console.error('Error fetching followers:', error);
      }
    };

    if (followers.length === 0) {
      fetchFollowers();
    }
  }, [followers, user.accountname, user.token]);

  const chats = followers
    .filter(follower => follower.isfollow)
    .map(item => ({
      id: item._id,
      username: item.username,
      image: item.image ? item.image : ProfileImg,
      message: item.intro,
      date: '2023.07.30',
    }));
  console.log('item', chats);

  return (
    <Layout modalOpen={() => modalOpen(['setting', 'logout'])}>
      <h1 className="a11y-hidden">채팅목록</h1>
      <div className={styles['main-top']}>
        <ul className={styles['chat-list']}>
          {chats.map(chat => (
            <ChatItem key={chat.id} chat={chat} />
          ))}
        </ul>
      </div>
      {isModalShow && <Modal modalClose={modalClose} modalMenu={modalMenu} />}
    </Layout>
  );
}
