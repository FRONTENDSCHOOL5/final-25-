import React from 'react';
import './Layout.module.css';
import Header from '../common/HeaderTest/Header';
import TabMenu from '../common/TabMenu/TabMenu';
import Input from '../common/Input/Input';

export default function Layout({ children }) {
  let type;
  switch (document.location.pathname) {
    case '/post':
      type = 'input';
      break;

    default:
      break;
  }
  return (
    <>
      <Header />
      <main>{children}</main>
      <footer>
        {type === 'input' ? <Input type="comment" /> : <TabMenu />}
      </footer>
    </>
  );
}
