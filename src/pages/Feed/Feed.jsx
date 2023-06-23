import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import Splash from '../Splash/Splash';
import ProfilePost from '../../components/common/Profile/ProfilePost';

export default function Feed() {
  const token = localStorage.getItem('token');
  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 1000);
  }, []);

  if (showSplash) {
    return <Splash />;
  }

  return (
    <Layout>
      <ProfilePost type="feed" />
    </Layout>
  );
}
