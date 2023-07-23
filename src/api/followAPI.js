import BASE_URL from '../utils/baseUrl';

const followAPI = {
  async followingPost(token, pageAccount) {
    const response = await fetch(`${BASE_URL}/profile/${pageAccount}/follow`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  },
  // 페이지 어카운트는 삭제하고자하는 상대방 계정이름을 가져와야함
  async unfollowingPost(token, pageAccount) {
    const response = await fetch(
      `${BASE_URL}/profile/${pageAccount}/unfollow`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      },
    );
    const data = await response.json();
    return data;
  },
};

export default followAPI;
