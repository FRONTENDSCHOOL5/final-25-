import BASE_URL from '../utils/baseUrl';

const profileAPI = {
  // 내 프로필 정보
  async getMyProfile(token) {
    console.log('유저정보');
    const response = await fetch(BASE_URL + '/user/myinfo', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('네트워크에 문제가 있습니다!');
    }

    const data = await response.json();
    console.log('profielAPI.getProfile, 내 프로필 정보: ', data);

    return data;
  },

  // 유저 프로필 정보
  async getUserProfile(token, accountname) {
    const response = await fetch(
      `https://api.mandarin.weniv.co.kr/profile/${accountname}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error('네트워크에 문제가 있습니다!');
    }

    const data = await response.json();
    return data;
  },

  // 프로필 페이지에서 팔로우/언팔로우
  async postUserFollow(token, accountName, endpoint, method) {
    const response = await fetch(
      BASE_URL + `/profile/${accountName}${endpoint}`,
      {
        method: method,
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error('네트워크에 오류가 발생했습니다!');
    }

    const data = await response.json();
    console.log(endpoint, data);
    return data;
  },
};

export default profileAPI;
