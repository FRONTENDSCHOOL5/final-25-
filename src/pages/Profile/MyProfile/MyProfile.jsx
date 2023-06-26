import React, { useState } from 'react';
import Layout from '../../../components/layout/Layout';
import UserProfile from '../../../components/common/Profile/UserProfile';
import ProfileProduct from '../../../components/common/Profile/ProfileProduct';
import ProfilePost from '../../../components/common/Profile/ProfilePost';
import Modal from '../../../components/common/Modal/Modal';

export default function MyProfile() {
  const [isModalShow, setIsModalShow] = useState(false);
  const [modalMenu, setmodalMenu] = useState(['delete-post']);

  function modalOpen(menu) {
    setIsModalShow(true);
    setmodalMenu(menu);
  }

  function modalClose(event) {
    if (event.target === event.currentTarget) {
      setIsModalShow(false);
    }
  }

  return (
    <>
      <Layout modalOpen={() => modalOpen(['setting', 'logout'])}>
        <UserProfile />
        <ProfileProduct />
        <ProfilePost
          type="profile"
          modalOpen={() => modalOpen(['delete-post', 'edit-post'])}
        />
        {isModalShow && <Modal modalClose={modalClose} modalMenu={modalMenu} />}
      </Layout>
    </>
  );
}
