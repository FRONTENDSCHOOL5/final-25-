import BASE_URL from '../utils/baseUrl';

const postAPI = {
  async getFeed(token) {
    const response = await fetch(BASE_URL + '/post/feed', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('네트워크에 문제가 있습니다!');
    }

    const data = await response.json();
    console.log('postAPI.getFeed에서 내 피드 게시글 리스트: ', data);
    return data;
  },
  async getUserpost(token, accountName) {
    try {
      const response = await fetch(BASE_URL + `/post/${accountName}/userpost`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('네트워크에 문제가 있습니다!');
      }
      const data = await response.json();
      console.log('postAPI.getUserPost에서 유저 게시글 리스트: ', data);
      return data;
    } catch (error) {
      console.error(error);
    }
  },
  async getPostDetail(token, postId) {
    console.log('API에서 postId', postId);
    try {
      const response = await fetch(BASE_URL + `/post/${postId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('네트워크에 문제가 있습니다!');
      }
      const data = await response.json();
      console.log('postAPI.getPostDetail 게시글: ', data);
      return data;
    } catch (error) {
      console.error(error);
    }
  },
};

export default postAPI;
