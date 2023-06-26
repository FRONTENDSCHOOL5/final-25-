import React, { useState } from 'react';
import Layout from '../../../components/layout/Layout';
import UserProfile from '../../../components/common/Profile/UserProfile';
import ProfileProduct from '../../../components/common/Profile/ProfileProduct';
import ProfilePost from '../../../components/common/Profile/ProfilePost';
import Modal from '../../../components/common/Modal/Modal';

export default function MyProfile() {
  const [isModalShow, setIsModalShow] = useState(false);

  function modalOpen() {
    setIsModalShow(true);
  }

  function modalClose(event) {
    if (event.target === event.currentTarget) {
      setIsModalShow(false);
    }
  }

  return (
    <>
      <Layout modalOpen={() => modalOpen()}>
        <UserProfile />
        <ProfileProduct />
        <ProfilePost type="profile" />
        {isModalShow && (
          <Modal modalClose={modalClose} menu={['setting', 'logout']} />
        )}
      </Layout>
    </>
  );
}
