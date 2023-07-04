import React, { useState } from 'react';
import Layout from '../../../components/layout/Layout';
import UserProfile from '../../../components/common/Profile/UserProfile';
import ProfileProduct from '../../../components/common/Profile/ProfileProduct';
import ProfilePost from '../../../components/common/Profile/ProfilePost';
import Modal from '../../../components/common/Modal/Modal';

export default function MyProfile() {
  const [isModalShow, setIsModalShow] = useState(false);
  const [modalMenu, setmodalMenu] = useState(['delete-post']);
  const [postId, setPostId] = useState('');
  const [productId, setProductId] = useState('');
  const [productUrl, setProductUrl] = useState('');

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

  return (
    <>
      <Layout modalOpen={() => modalOpen(['setting', 'logout'])}>
        <UserProfile />
        <ProfileProduct
          modalOpen={() =>
            modalOpen(['product-delete', 'product-modi', 'product-more'])
          }
          setProductId={setProductId}
          setProductUrl={setProductUrl}
        />
        <ProfilePost
          type="profile"
          modalOpen={() => modalOpen(['delete-post'])}
          getPostId={getPostId}
        />
        {isModalShow && (
          <Modal
            modalClose={modalClose}
            modalMenu={modalMenu}
            postId={postId}
            productId={productId}
            productUrl={productUrl}
          />
        )}
      </Layout>
    </>
  );
}
