import React, { useEffect, useState } from 'react';
import UserSearch from '../../components/common/User/UserSearch/UserSearch';
import Layout from '../../components/layout/Layout';
import searchAPI from '../../api/searchAPI';

export default function Search() {
  const token = localStorage.getItem('token');

  const [items, setItems] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);

  const userLoad = async () => {
    let result;
    try {
      setIsLoading(true);
      setLoadingError(null);
      result = await searchAPI.getUsers(token, keyword);
    } catch (error) {
      setLoadingError(error);
      return;
    } finally {
      setIsLoading(false);
    }
    setItems(result);
  };

  useEffect(() => {
    let timeoutId = null;

    const handleKeywordChange = () => {
      if (keyword === '') {
        setItems([]);
      } else {
        userLoad();
      }
    };

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(handleKeywordChange, 10);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [keyword]);

  return (
    <Layout setKeyword={setKeyword}>
      {items.length !== 0 && <UserSearch items={items} keyword={keyword} />}
      {loadingError && <p>{loadingError.message}</p>}
    </Layout>
  );
}
