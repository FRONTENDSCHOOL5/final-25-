import BASE_URL from '../utils/baseUrl';

const searchAPI = {
  async getUsers(token, search) {
    const query = `?keyword=${search}`;
    const response = await fetch(BASE_URL + '/user/searchuser/' + query, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('네트워크에 오류가 발생했습니다!');
    }

    const data = await response.json();
    return data;
  },
};

export default searchAPI;
