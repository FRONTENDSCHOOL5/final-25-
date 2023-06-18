import React from 'react';
import './Layout.module.css';
import Header from '../common/HeaderTest/Header';
import TabMenu from '../common/TabMenu/TabMenu';
import Input from '../common/Input/Input';

export default function Layout({ children }) {
  let headerType;
  let footerType;

  switch (document.location.pathname) {
    case '/':
      headerType = 'header';
      footerType = 'home';
      break;
    case '/profile':
      headerType = 'header';
      footerType = 'profile';
      break;
    case '/post':
      headerType = 'header';
      footerType = 'comment';
      break;
    case '/chat':
      headerType = 'chat';
      footerType = 'chat';
      break;
    case '/search':
      headerType = 'userSearch';
      break;
    default:
      headerType = 'none';
      footerType = 'none';
      break;
  }
  return (
    <>
      <Header type={headerType} />
      <main>{children}</main>
      <footer>
        {footerType === 'input' || footerType === 'comment' ? (
          <Input type={footerType} />
        ) : (
          <TabMenu type={footerType} />
        )}
      </footer>
    </>
  );
}
