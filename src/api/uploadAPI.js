import { useState } from 'react';

const useUploadAPI = () => {
  const [postId, setPostId] = useState('');

  const token = localStorage.getItem('token');

  const fetchPost = async (contents, imagesString) => {
    try {
      const response = await fetch('https://api.mandarin.weniv.co.kr/post', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          post: {
            content: contents,
            image: imagesString,
          },
        }),
      });
      const data = await response.json();
      console.log('DDDDD', data);
      setPostId(data['post']['id']);
    } catch (error) {
      console.log(error);
    }
  };

  return { postId, fetchPost };
};

export default useUploadAPI;
