import React, { useState } from 'react';
import styles from './AddProduct.module.css';
import Layout from '../../components/layout/Layout';
import { useNavigate } from 'react-router-dom';

export default function AddProduct() {
  const [productImg, setProductImg] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [saleLink, setSaleLink] = useState('');
  const [nameError, setNameError] = useState('');
  const [productPriceError, setProductPriceError] = useState('');
  const [saleLinkError, setSaleLinkError] = useState('');
  const navigate = useNavigate();

  const handleName = e => {
    const value = e.target.value;
    if (value.length >= 2 && value.length <= 15) {
      setProductName(value);
      setNameError('');
      console.log(value);
    } else {
      setProductName(value);
      setNameError('이름은 2~15자 이내여야 합니다.');
    }
  };

  const handlePrice = e => {
    const value = e.target.value.replace(/,/g, '');
    if (/^[0-9]{0,9}$/.test(value)) {
      const formattedPrice = Number(value).toLocaleString('en-US');
      setProductPrice(formattedPrice);
      setProductPriceError('');
      console.log(formattedPrice);
    } else {
      setProductPrice('');
      setProductPriceError('가격은 최대 9자리 숫자로 입력해주세요.');
    }
  };

  const handleSaleLink = e => {
    const value = e.target.value;
    if (isValidUrl(value)) {
      setSaleLink(value);
      setSaleLinkError('');
      console.log(value);
    } else {
      setSaleLink(value);
      setSaleLinkError('유효한 URL을 입력해주세요.');
    }
  };

  const isValidUrl = url => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleImageInput = async e => {
    const formData = new FormData();
    const imageFile = e.target.files[0];
    formData.append('image', imageFile);

    try {
      const res = await fetch(
        'https://api.mandarin.weniv.co.kr/image/uploadfile',
        {
          method: 'POST',
          body: formData,
        },
      );

      if (!res.ok) {
        throw new Error('Image upload failed');
      }
      const json = await res.json();
      const imageSrc = 'https://api.mandarin.weniv.co.kr/' + json.filename;
      setProductImg(imageSrc);
      console.log(imageSrc);
    } catch (error) {
      console.log(error);
    }
  };

  const token = localStorage.getItem('token');

  const handleSubmit = e => {
    e.preventDefault();
    // 폼 제출 논리 구현
    // handleImageInput()
    fetch('https://api.mandarin.weniv.co.kr/product', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        product: {
          itemName: productName,
          price: parseInt(productPrice), //1원 이상
          link: saleLink,
          itemImage: productImg,
        },
      }),
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
      })
      .catch(error => console.log(error));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Layout>
          <section className={styles['product-image-container']}>
            <div className={styles['product-file-font']}>이미지 등록</div>
            {/* <form onSubmit={handleSubmit}> */}
            <label
              className={styles['product-file-upload']}
              htmlFor="productImg"
              style={{
                backgroundImage: `url(${productImg})`,
                backgroundSize: 'cover',
              }}
            ></label>
            <input
              className="a11y-hidden"
              type="file"
              id="productImg"
              onChange={handleImageInput}
            />
            <section className={styles['product-title']}>
              <div>공구 이름</div>
              <label htmlFor="productName" className="a11y-hidden"></label>
              <input
                className={styles['product-title-input']}
                type="text"
                placeholder="2~15자 이내여야 합니다."
                required
                id="productName"
                onChange={handleName}
              />
              {Boolean(nameError) && (
                <p className={styles['error-message']}>{nameError}</p>
              )}
            </section>
            <section className={styles['product-title']}>
              <div>가격</div>
              <label htmlFor="productPrice" className="a11y-hidden"></label>
              <input
                className={styles['product-title-input']}
                type="number"
                placeholder="숫자만 입력 가능합니다."
                step="any"
                required
                id="productPrice"
                onChange={handlePrice}
              />
              {productPriceError && (
                <p className={styles['error-message']}>{productPriceError}</p>
              )}
            </section>
            <section className={styles['product-title']}>
              <div>판매링크</div>
              <label htmlFor="saleLink"></label>
              <input
                className={styles['product-title-input']}
                type="text"
                placeholder="URL을 입력해 주세요"
                required
                id="saleLink"
                onChange={handleSaleLink}
              />
            </section>
            {saleLinkError && (
              <p style={{ color: 'red', fontSize: '12px', textAlign: 'left' }}>
                {saleLinkError}
              </p>
            )}
            {/* </form> */}
          </section>
        </Layout>
      </form>
    </>
  );
}
