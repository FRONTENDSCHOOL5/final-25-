import BASE_URL from '../utils/baseUrl';

const productAPI = {
  // 상품 리스트
  async getProductList(token, accountName) {
    try {
      const response = await fetch(BASE_URL + `/product/${accountName}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('네트워크에 문제가 있습니다!');
      }
      const data = await response.json();
      console.log('productAPI.getProductList: 상품 리스트', data);
      return data;
    } catch (error) {
      console.error(error);
    }
  },
};

export default productAPI;
