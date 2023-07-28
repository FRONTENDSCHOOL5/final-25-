import React from 'react';
import styles from './Product.module.css';

export default function ProfileProduct({
  data,
  modalOpen,
  setProductId,
  setProductUrl,
}) {
  console.log('ssss', data);
  // const price = data['price'].toLocaleString();
  const price = data['price'];

  const productClickHandelr = () => {
    if (document.location.pathname === '/profile') {
      console.log('모달');
      modalOpen(true);
      setProductId(data.id);
      setProductUrl(data.link);
    } else {
      window.open(data['link'], '_blank');
    }
  };
  return (
    <>
      <article className={styles['product-item']} onClick={productClickHandelr}>
        <div className={styles['product-img-container']}>
          <img
            className={styles['product-img']}
            src={data['itemImage']}
            alt="삼품 사진"
          />
        </div>
        <h4 className={styles['product-name']}>{data['itemName']}</h4>
        <div className={styles['product-price']}>{price} 원</div>
      </article>
    </>
  );
}
