import BASE_URL from '../utils/baseUrl';

const postAPI = {
  async getFeed(token) {
    try {
      const response = await fetch(BASE_URL + '/post/feed', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        // 여기 안나오는데?
        throw new Error('네트워크에 문제가 있습니다!');
      }

      const data = await response.json();
      console.log('postAPI.getFeed에서 내 피드 게시글 리스트: ', data);
      return data;
    } catch (error) {
      console.error('데이터를 가져오는 데 문제가 생겼습니다.', error);
    }
  },
};

export default postAPI;
