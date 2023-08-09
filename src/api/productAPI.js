import BASE_URL from '../utils/baseUrl';

const productAPI = {
  // 상품 리스트
  async getProductList(token, accountName) {
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
  },
  async addProduct(token, productName, productPrice, saleLink, productImg) {
    try {
      const response = await fetch(BASE_URL + `/product`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          product: {
            itemName: productName,
            price: parseInt(productPrice.replace(/,/g, '')), // 1원 이상
            link: saleLink,
            itemImage: productImg,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('네트워크에 문제가 있습니다!');
      }

      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
    }
  },
  // 상품 상세
  async getProductDetail(token, productId) {
    const response = await fetch(BASE_URL + `/product/detail/${productId}`, {
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
    console.log('productAPI.getProductDetail: 상품 상세', data);
    return data;
  },
  // 상품 수정
  async productModi(
    token,
    productName,
    productPrice,
    saleLink,
    productImg,
    productId,
  ) {
    console.log(typeof productPrice);
    // productPrice의 type을 확인하고, string이면, replace 처리를 하고
    // number일 경우에는 rawData를 넣는 로직이 필요같아요.
    const response = await fetch(BASE_URL + `/product/${productId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        product: {
          itemName: productName,
          // price: parseInt(productPrice.replace(',', '')),
          price: Number(productPrice.replace(/,/g, '')),
          // price: parseInt(productPrice),
          link: saleLink,
          itemImage: productImg,
        },
      }),
    });

    if (!response.ok) {
      throw new Error('네트워크에 문제가 있습니다!');
    }

    const result = await response.json();
    console.log('ㄴㄴㄴ', result);
    return result;
  },
};

export default productAPI;
