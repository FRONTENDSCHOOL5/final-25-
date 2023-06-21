import { useState, useEffect } from 'react';

// 내 프로필 API: 'https://api.mandarin.weniv.co.kr/user/myinfo'

export const useProfileAPI = () => {
  const [profile, setProfile] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const url = 'https://api.mandarin.weniv.co.kr';

  useEffect(() => {
    async function fetchProfile() {
      setIsLoading(true);
      try {
        const response = await fetch(url + '/user/myinfo', {
          method: 'GET',
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OGZhNjExYjJjYjIwNTY2MzNhNzUxZCIsImV4cCI6MTY5MjM1NDE4NywiaWF0IjoxNjg3MTcwMTg3fQ.MiyMMGRaddraLYS_d-o-LwaSVduR4MacYWqjUL5SFFA',
          },
        });

        if (!response.ok) {
          throw new Error('네트워크에 문제가 있습니다!');
        }
        const data = await response.json();
        setProfile(data['user']);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }
    fetchProfile();
  }, []);

  return { profile };
};
