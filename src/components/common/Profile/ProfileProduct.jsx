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
  const userAccountName = pathName.includes('/profile/')
    ? document.location.pathname.replace('/profile/', '')
    : localStorage.getItem('accountname');

  // 상품 리스트
  const [accountName, setAccountName] = useState(userAccountName);
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProductList = async () => {
      const data = await productAPI.getProductList(token, accountName);
      setIsLoading(false);
      setProduct(data['product']);
    };
    fetchProductList();
  }, []);

  return (
    <>
      {product.length !== 0 ? (
        <section className={styles.product}>
          <h2 className={styles['product-title']}>공구 중인 상품</h2>
          <ul className={styles['product-list']}>
            {product.map(item => {
              return (
                <li data-product-id={item.id}>
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
