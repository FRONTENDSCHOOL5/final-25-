import React, { useEffect, useRef, useState } from 'react';
import styles from './SearchUser.module.css';
import UserSearch from '../../components/common/User/UserSearch/UserSearch';
import Layout from '../../components/layout/Layout';

export default function SearchUser() {
  const token = localStorage.getItem('token');

  const [keyword, setKeyword] = useState('');
  const [userArr, setUserArr] = useState();

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (keyword !== '') {
      fetchSearch(keyword);
    } else {
      setUserArr([]);
    }

    async function fetchSearch(keyword) {
      try {
        const response = await fetch(
          `https://api.mandarin.weniv.co.kr/user/searchuser/?keyword=${keyword}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error('Network Error!');
        }

        const data = await response.json();
        setUserArr(data);
      } catch (error) {
        console.error(error);
      }
    }
  }, [keyword]);

  return (
    <Layout setKeyword={setKeyword}>
      {userArr && (
        <ul className={styles['user-list']}>
          {userArr.map(item => {
            return (
              <li key={item.id} className={styles['user-item']}>
                <UserSearch key={item.id} data={item} keyword={keyword} />
              </li>
            );
          })}
        </ul>
      )}
    </Layout>
  );
}
