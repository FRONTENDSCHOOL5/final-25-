import React, { useState } from 'react';
import styles from './SearchUser.module.css';
import UserSearch from '../../components/common/User/UserSearch/UserSearch';
import { Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout';

export default function SearchUser() {
  const token = localStorage.getItem('token');

  const [keyword, setKeyword] = useState('');

  return (
    <>
      <Layout keyword={keyword}>
        <ul className={styles['user-list']}>
          <li className={styles['user-item']}>
            <UserSearch />
          </li>
        </ul>
      </Layout>
    </>
  );
}
