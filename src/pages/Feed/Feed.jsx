import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import ProfilePost from '../../components/common/Profile/ProfilePost';
import Splash from '../Splash/Splash';
import Modal from '../../components/common/Modal/Modal';

export default function Feed() {
  const token = localStorage.getItem('token');
  const [showSplash, setShowSplash] = useState(true);
  const [isModalShow, setIsModalShow] = useState(false);
  const [modalMenu, setmodalMenu] = useState(['delete-post']);
  const [postId, setPostId] = useState('');
  const navigate = useNavigate();

  function modalOpen(menu) {
    setIsModalShow(true);
    setmodalMenu(menu);
  }

  function modalClose(event) {
    if (event.target === event.currentTarget) {
      setIsModalShow(false);
    }
  }

  function getPostId(event) {
    const closestArticle = event.target.closest('article');
    const postid = closestArticle.getAttribute('data-id');
    setPostId(postid);
  }

  useEffect(() => {
    setTimeout(() => {
      if (token) {
        setShowSplash(false);
      } else {
        navigate('/login');
      }
    }, 1000);
  }, []);

  return showSplash ? (
    <Splash />
  ) : (
    <Layout>
      <ProfilePost
        type="feed"
        modalOpen={() => modalOpen(['report-post'])}
        getPostId={getPostId}
      />
      {isModalShow && (
        <Modal modalClose={modalClose} modalMenu={modalMenu} postId={postId} />
      )}
    </Layout>
  );
}
