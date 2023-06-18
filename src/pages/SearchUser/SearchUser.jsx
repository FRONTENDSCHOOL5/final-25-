import React from 'react';
import styles from './SearchUser.module.css';
import Search from '../../components/common/Header/UserSearch';
import UserSearch from '../../components/common/User/UserSearch/UserSearch';
import TabMenu from '../../components/common/TabMenu/TabMenu';
export default function SearchUser() {
  return (
    <>
      <header>
        <Search />
      </header>
      <main className={styles['search-main']}>
        <UserSearch />
        <UserSearch />
        <UserSearch />
        <UserSearch />
      </main>
      <footer>
        <TabMenu />
      </footer>
    </>
  );
}
