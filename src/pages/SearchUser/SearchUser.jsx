import React from 'react';
import styles from './SearchUser.module.css';
import UserSearch from '../../components/common/User/UserSearch/UserSearch';
import Layout from '../../components/layout/Layout';
export default function SearchUser() {
  return (
    <>
      <Layout>
        <UserSearch />
      </Layout>
    </>
  );
}
