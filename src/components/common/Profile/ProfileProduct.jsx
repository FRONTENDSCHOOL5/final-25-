import React, { useState, useEffect } from 'react';
import styles from './ProfileProduct.module.css';
import productAPI from '../../../api/productAPI';
import Product from '../Product/Product';

export default function ProductList({
  modalOpen,
  setProductId,
  setProductUrl,
}) {
  const token = localStorage.getItem('token');
  const pathName = document.location.pathname;
  const accountName = pathName.includes('/profile/')
    ? document.location.pathname.replace('/profile/', '')
    : localStorage.getItem('accountname');

  // 상품 리스트
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(null);

  const fetchProductList = async () => {
    let data;
    try {
      setIsLoading(true);
      setLoadingError(null);
      data = await productAPI.getProductList(token, accountName);
    } catch (error) {
      setLoadingError(error);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
    setProduct(data.product);
  };

  useEffect(() => {
    fetchProductList();
  }, []);

  return (
    <>
      {product.length !== 0 || !isLoading ? (
        <section className={styles.product}>
          <h2 className={styles['product-title']}>공구 중인 상품</h2>
          <ul className={styles['product-list']}>
            {product.map(item => {
              return (
                <li data-product-id={item.id} key={item.id}>
                  <Product
                    data={item}
                    modalOpen={modalOpen}
                    setProductId={setProductId}
                    setProductUrl={setProductUrl}
                  />
                </li>
              );
            })}
          </ul>
        </section>
      ) : (
        <></>
      )}
    </>
  );
}
