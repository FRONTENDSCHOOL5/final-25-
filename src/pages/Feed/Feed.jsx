import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import ProfilePost from '../../components/common/Profile/ProfilePost';
import Splash from '../Splash/Splash';

export default function Feed() {
  const token = localStorage.getItem('token');
  const [showSplash, setShowSplash] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      if (token) {
        setShowSplash(false);
      } else {
        navigate('/login');
      }
    }, 1000);
  }, []);

  return showSplash ? (
    <Splash />
  ) : (
    <Layout>
      <ProfilePost type="feed" />
    </Layout>
  );
}
