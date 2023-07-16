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
  // 댓글 삭제
  async deleteComment({ token, postId, commentId }) {
    console.log({ token, postId, commentId });
    const response = await fetch(
      BASE_URL + `/post/${postId}/comments/${commentId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (!response.ok) {
      throw new Error('네트워크에 문제가 있습니다!');
    }

    const data = await response.json();
    console.log('commentAPI.deleteComment 댓글 삭제: ', data);
    return data;
  },
  // 댓글 신고
  async reportComment({ token, postId, commentId }) {
    console.log({ token, postId, commentId });
    const response = await fetch(
      BASE_URL + `/post/${postId}/comments/${commentId}/report`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (!response.ok) {
      throw new Error('네트워크에 문제가 있습니다!');
    }

    const data = await response.json();
    console.log('commentAPI.reportComment 댓글 신고: ', data);
    return data;
  },
};

export default commentAPI;
