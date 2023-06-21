import React from 'react';
import Layout from '../../components/layout/Layout';
import OtherProfile from '../../components/common/Profile/OtherProfile';
import ProfileProduct from '../../components/common/Profile/ProfileProduct';
import ProfileAlbum from '../../components/common/Profile/ProfileAlbum';

export default function YourProfile() {
  return (
    <>
      <Layout>
        <OtherProfile />
        <ProfileProduct />
        {/* <ProfilePost /> */}
        <ProfileAlbum />
      </Layout>
    </>
  );
}
