import BASE_URL from '../utils/baseUrl';

const commentAPI = {
  // 댓글 리스트
  async getComments(token, postId) {
    const response = await fetch(BASE_URL + `/post/${postId}/comments`, {
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
    console.log('commentAPI.getComments 댓글 리스트: ', data);
    return data;
  },
  // 댓글 등록
  async postComment({ token, postId, comment = '' }) {
    const response = await fetch(BASE_URL + `/post/${postId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        comment: {
          content: comment,
        },
      }),
    });
    if (!response.ok) {
      throw new Error('네트워크에 문제가 있습니다!');
    }

    const data = await response.json();
    console.log('commentAPI.postComment 댓글 등록: ', data);
    return data;
  },
};

export default commentAPI;
