import React, { useState } from 'react';
import styles from './AddProduct.module.css';
import Layout from '../../components/layout/Layout';
import { useNavigate } from 'react-router-dom';
import productAPI from '../../api/productAPI';
import imageAPI from '../../api/imageAPI';

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
  const [isBtnState, setBtnstate] = useState(false);
  const navigate = useNavigate();

  const onHandleName = e => {
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
    isHandler();
  };

  const onHandlePrice = e => {
    let value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length > 9) {
      value = value.slice(0, 9);
    }
    if (/^[0-9]{0,9}$/.test(value)) {
      const formattedPrice = Number(value).toLocaleString('en-US');
      setProductPrice(formattedPrice);
      setProductPriceError('');
      setIsFormValid(value !== '');
    } else {
      setProductPrice(value);
      setProductPriceError('가격은 최대 9자리 숫자로 입력해주세요.');
      setIsFormValid(false);
    }
    isHandler();
  };

  const onHandleSaleLink = e => {
    const value = e.target.value;
    if (isValidUrl(value)) {
      setSaleLink(value);
      setSaleLinkError('');
      setIsFormValid(value !== '');
    } else {
      setSaleLink(value);
      setSaleLinkError(value !== '' ? '유효한 URL을 입력해주세요.' : '');
      setIsFormValid(false);
      return;
    }
    isHandler();
  };

  const isValidUrl = url => {
    const urlRegex =
      /^(http[s]?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}\/?([^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(\/[\w.-]*)*\/?$/;
    return urlRegex.test(url);
  };

  const onHandleImageInput = async e => {
    try {
      const imageSrc = await imageAPI.uploadImg(e);
      setProductImg(imageSrc);
    } catch (error) {
      console.log(error);
    }
  };
  // 버튼 핸들러
  const isHandler = () => {
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

  const handleSubmit = async e => {
    e.preventDefault();

    if (!isFormValid) {
      return; // 폼이 유효하지 않으면 제출하지 않음
    }
    try {
      const result = await productAPI.addProduct(
        token,
        productName,
        productPrice,
        saleLink,
        productImg,
      );
      console.log(result);
      navigate('/profile');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Layout btnHandler={isHandler} btn={isBtnState}>
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
              onChange={onHandleImageInput}
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
                onChange={onHandleName}
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
                onChange={onHandlePrice}
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
                onChange={onHandleSaleLink}
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
