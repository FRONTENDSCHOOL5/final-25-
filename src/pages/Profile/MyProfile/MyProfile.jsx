import React from 'react';
import Layout from '../../../components/layout/Layout';
import UserProfile from '../../../components/common/Profile/UserProfile';
import ProfileProduct from '../../../components/common/Profile/ProfileProduct';
import ProfilePost from '../../../components/common/Profile/ProfilePost';

export default function MyProfile() {
  return (
    <>
      <Layout>
        <UserProfile />
        <ProfileProduct />
        <ProfilePost />
      </Layout>
    </>
  );
}
