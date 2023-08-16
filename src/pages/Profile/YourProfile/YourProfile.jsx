import React, { useState } from 'react';
import Layout from '../../../components/layout/Layout';
import OtherProfile from '../../../components/common/Profile/OtherProfile';
import ProductList from '../../../components/common/Product/ProductList';
import ProfilePost from '../../../components/common/Profile/ProfilePost';
import Modal from '../../../components/common/Modal/Modal';
import AlertModal from '../../../components/common/Modal/AlertModal/AlertModal';

export default function YourProfile() {
  const [isModalShow, setIsModalShow] = useState(false);
  const [isAlertShow, setIsAlertShow] = useState(false);
  const [modalMenu, setmodalMenu] = useState(['delete-post']);
  const [postId, setPostId] = useState('');

  function modalOpen(menu) {
    setIsModalShow(true);
    setmodalMenu(menu);
  }

  function modalClose(event) {
    if (event.target === event.currentTarget) {
      setIsModalShow(false);
    }
  }

  function alertOpen() {
    setIsAlertShow(true);
    console.log('alert');
  }

  function alertClose(event) {
    if (event.target === event.currentTarget) {
      setIsAlertShow(false);
    }
  }

  function getPostId(event) {
    const closestArticle = event.target.closest('article');
    const postid = closestArticle.getAttribute('data-id');
    setPostId(postid);
  }

  return (
    <>
      <Layout modalOpen={() => modalOpen(['setting', 'logout'])}>
        <OtherProfile alertOpen={() => alertOpen()} />
        <ProductList />
        <ProfilePost
          type="profile"
          modalOpen={() => modalOpen(['report-post'])}
          getPostId={getPostId}
        />
        {isModalShow && (
          <Modal
            modalClose={modalClose}
            modalMenu={modalMenu}
            postId={postId}
          />
        )}
        {isAlertShow && <AlertModal type="share" modalClose={alertClose} />}
      </Layout>
    </>
  );
}
