import React from 'react';
import './Layout.module.css';
import Header from '../common/HeaderTest/Header';
import TabMenu from '../common/TabMenu/TabMenu';

export default function Layout({ children, header, footer }) {
  return (
    <>
      <Header type={header} />
      <main>{children}</main>
      <footer>
        <TabMenu type={footer} />
      </footer>
    </>
  );
}
