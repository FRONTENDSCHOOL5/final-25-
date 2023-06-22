import React, { useState, useEffect } from 'react';
import styles from './ProfileProduct.module.css';
import Product from '../Product/Product';

export default function ProductList() {
  // 상품 리스트 API: 'https://api.mandarin.weniv.co.kr/product/:accountname'
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const url = 'https://api.mandarin.weniv.co.kr';

  useEffect(() => {
    async function fetchProduct() {
      setIsLoading(true);
      try {
        const response = await fetch(url + '/product/sunbin5', {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OGZhNjExYjJjYjIwNTY2MzNhNzUxZCIsImV4cCI6MTY5MjM1NDE4NywiaWF0IjoxNjg3MTcwMTg3fQ.MiyMMGRaddraLYS_d-o-LwaSVduR4MacYWqjUL5SFFA',
          },
        });
        if (!response.ok) {
          throw new Error('네트워크에 문제가 있습니다!');
        }
        const data = await response.json();
        setProduct(data);
        setIsLoading(false);
        console.log(data['product']);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }
    fetchProduct();
  }, []);

  return (
    <>
      {product.length ? (
        <section className={styles.product}>
          <h2 className={styles['product-title']}>공구 중인 상품</h2>
          <ul className={styles['product-list']}>
            <li>
              <Product />
            </li>
          </ul>
        </section>
      ) : (
        <></>
      )}
    </>
  );
}
