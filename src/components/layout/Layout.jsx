import React from 'react';
import './Layout.module.css';
import Header from '../common/HeaderTest/Header';
import TabMenu from '../common/TabMenu/TabMenu';
import Input from '../common/Input/Input';

export default function Layout({ children, btnHandler }) {
  let headerType;
  let footerType;
  let pathToCheck;

  const path = document.location.pathname;
  if (path.includes('/profile/m')) {
    pathToCheck = '/profile/m';
  } else if (path.includes('/profile/')) {
    pathToCheck = '/profile/:accountname';
  } else if (path.includes('/followers/')) {
    pathToCheck = '/followers';
  } else if (path.includes('/followings/')) {
    pathToCheck = '/followings';
  } else if (path.includes('/post/')) {
    pathToCheck = '/post';
  } else {
    pathToCheck = path;
  }

  switch (pathToCheck) {
    case '/':
      headerType = 'homeSearch';
      footerType = 'home';
      break;
    case '/profile':
      headerType = 'header';
      footerType = 'profile';
      break;
    case '/profile/m':
      headerType = btnHandler() ? 'colorButton' : 'saveButton';
      footerType = 'none';
      break;
    case '/product':
      headerType = btnHandler() ? 'colorButton' : 'saveButton';
      footerType = 'none';
      break;
    case '/product/m':
      headerType = 'colorButton';
      footerType = 'none';
      break;
    case '/followers':
      headerType = 'followers';
      footerType = 'none';
      break;
    case '/followings':
      headerType = 'followings';
      footerType = 'none';
      break;
    case '/profile/:accountname':
      headerType = 'header';
      footerType = 'home';
      break;
    case '/post':
      headerType = 'header';
      footerType = 'comment';
      break;
    case '/post/upload':
      headerType = btnHandler ? 'uploadColorButton' : 'uploadButton';
      footerType = 'none';
      break;
    case '/chat':
      headerType = 'header';
      footerType = 'chat';
      break;
    case '/chat/1234':
      headerType = 'chatHeader';
      footerType = 'chatting';
      break;
    case '/search':
      headerType = 'userSearch';
      footerType = 'home';
      break;
    default:
      headerType = 'none';
      footerType = 'none';
      break;
  }
  return (
    <>
      <Header type={headerType} btnHandler={btnHandler} />
      <main>{children}</main>

      {footerType === 'input' ||
      footerType === 'comment' ||
      footerType === 'chatting' ? (
        <footer>
          <Input type={footerType} />
        </footer>
      ) : (
        <TabMenu type={footerType} />
      )}
    </>
  );
}
