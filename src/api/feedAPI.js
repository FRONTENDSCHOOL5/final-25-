import { useState, useEffect } from 'react';

// 피드 API: 'https://api.mandarin.weniv.co.kr/post/feed'

export const useFeedAPI = () => {
  const [post, setPost] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const url = 'https://api.mandarin.weniv.co.kr';

  useEffect(() => {
    async function fetchFeed() {
      setIsLoading(true);
      try {
        const response = await fetch(url + '/post/feed', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OGZhNjExYjJjYjIwNTY2MzNhNzUxZCIsImV4cCI6MTY5MjM1NDE4NywiaWF0IjoxNjg3MTcwMTg3fQ.MiyMMGRaddraLYS_d-o-LwaSVduR4MacYWqjUL5SFFA',
          },
        });

        if (!response.ok) {
          throw new Error('네트워크에 문제가 있습니다!');
        }

        const data = await response.json();
        setPost(data['posts']);
        setIsLoading(false);
      } catch (error) {
        console.error('데이터를 가져오는 데 문제가 생겼습니다.', error);
        setIsLoading(false);
      }
    }
    fetchFeed();
  }, []);

  return { post };
};
