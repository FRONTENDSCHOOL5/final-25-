import BASE_URL from '../utils/baseUrl';

const profileAPI = {
  // 내 프로필 정보
  async getMyProfile(token) {
    console.log('유저정보');
    try {
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
    } catch (error) {
      console.error('데이터를 가져오는 데 문제가 생겼습니다.', error);
    }
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
};

export default profileAPI;
