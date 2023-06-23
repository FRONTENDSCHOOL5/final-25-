import BASE_URL from '../utils/baseUrl';

const commentAPI = {
  async getComments(token, postId) {
    try {
      const response = await fetch(BASE_URL + `/post/${postId}/comments`, {
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
      console.log('commentAPI.getComments 댓글 리스트: ', data);
      return data;
    } catch (error) {}
  },
};

export default commentAPI;
