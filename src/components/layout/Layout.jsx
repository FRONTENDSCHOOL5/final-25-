import React from 'react';
import './Layout.module.css';
import Header from '../common/HeaderTest/Header';
import TabMenu from '../common/TabMenu/TabMenu';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <footer>
        <TabMenu />
      </footer>
    </>
  );
}
