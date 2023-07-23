import BASE_URL from '../utils/baseUrl';

const postAPI = {
  // 피드 게시글
  async getFeed({ token, limit = 6, skip = 0 }) {
    console.log(limit, skip);
    const query = `?limit=${limit}&skip=${skip}`;
    const response = await fetch(BASE_URL + '/post/feed/' + query, {
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
  // 프로필 페이지 유저의 게시글
  async getUserpost(token, accountName) {
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
  },
  // 게시글 상세 페이지
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
  // 게시글 신고
  async reportPost({ token, postId }) {
    console.log({ token, postId });
    const response = await fetch(BASE_URL + `/post/${postId}/report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('네트워크에 문제가 있습니다!');
    }
  },
};

export default postAPI;
