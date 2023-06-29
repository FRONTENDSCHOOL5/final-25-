import React, { useState } from 'react';
import styles from './AddProduct.module.css';
import Layout from '../../components/layout/Layout';
import { useNavigate } from 'react-router-dom';

export default function AddProduct() {
  const [productImg, setProductImg] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [saleLink, setSaleLink] = useState('');
  // 에러
  const [nameError, setNameError] = useState('');
  const [productPriceError, setProductPriceError] = useState('');
  const [saleLinkError, setSaleLinkError] = useState('');
  //제출 할것인지?
  const [isFormValid, setIsFormValid] = useState(false);
  const [btnState, setBtnstate] = useState(false);
  const navigate = useNavigate();

  const handleName = e => {
    const value = e.target.value;
    if (value.length >= 2 && value.length <= 15) {
      setProductName(value);
      setNameError('');
      setIsFormValid(value !== '');
      console.log(value);
    } else {
      setProductName(value);
      setNameError(value !== '' ? '이름은 2~15자 이내여야 합니다.' : '');
      setIsFormValid(false);
    }
    handler();
  };

  const handlePrice = e => {
    let value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length > 9) {
      value = value.slice(0, 9);
    }
    if (/^[0-9]{0,9}$/.test(value)) {
      const formattedPrice = Number(value).toLocaleString('en-US');
      setProductPrice(formattedPrice);
      setProductPriceError('');
      setIsFormValid(value !== '');
      console.log(formattedPrice);
    } else {
      setProductPrice(value);
      setProductPriceError('가격은 최대 9자리 숫자로 입력해주세요.');
      setIsFormValid(false);
    }
    handler();
  };

  const handleSaleLink = e => {
    const value = e.target.value;
    if (isValidUrl(value)) {
      setSaleLink(value);
      setSaleLinkError('');
      setIsFormValid(value !== '');
      console.log(value);
    } else {
      setSaleLink(value);
      setSaleLinkError(value !== '' ? '유효한 URL을 입력해주세요.' : '');
      setIsFormValid(false);
      return;
    }
    handler();
  };

  const isValidUrl = url => {
    const urlRegex =
      /^(http[s]?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}\/?([^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(\/[\w.-]*)*\/?$/;
    return urlRegex.test(url);
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
  // 버튼 핸들러
  const handler = () => {
    if (
      productName !== '' &&
      productPrice !== '' &&
      saleLink !== '' &&
      productImg !== ''
    ) {
      setBtnstate(true);
      return true;
      // 모두 유효하면 버튼 상태를 true로 설정
    } else {
      setBtnstate(false);
      return false;
    }
  };
  const token = localStorage.getItem('token');

  const handleSubmit = e => {
    e.preventDefault();

    if (!isFormValid) {
      return; // 폼이 유효하지 않으면 제출하지 않음
    }
    fetch('https://api.mandarin.weniv.co.kr/product', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        product: {
          itemName: productName,
          price: parseInt(productPrice.replace(/,/g, '')), //1원 이상
          link: saleLink,
          itemImage: productImg,
        },
      }),
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        navigate('/profile');
      })
      .catch(error => console.log(error));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Layout btnHandler={handler} btn={btnState}>
          <section className={styles['product-image-container']}>
            <div className={styles['product-file-font']}>이미지 등록</div>
            <label
              className={styles['product-file-upload']}
              htmlFor="productImg"
              accept="image/jpg, image/jpeg, image/png"
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
              {Boolean(nameError) && nameError !== '' && (
                <p className={styles['error-message']}>{nameError}</p>
              )}
            </section>
            <section className={styles['product-title']}>
              <div>가격</div>
              <label htmlFor="productPrice" className="a11y-hidden"></label>
              <input
                className={styles['product-title-input']}
                type="text"
                placeholder="숫자만 입력 가능합니다."
                required
                id="productPrice"
                value={productPrice}
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
              {saleLinkError && (
                <p className={styles['error-message']}>{saleLinkError}</p>
              )}
            </section>
          </section>
        </Layout>
      </form>
    </>
  );
}
