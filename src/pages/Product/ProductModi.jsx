import React, { useState, useEffect } from 'react';
import styles from './ProductModi.module.css';
import Layout from '../../components/layout/Layout';
import productAPI from '../../api/productAPI';
import imageAPI from '../../api/imageAPI';
import { useNavigate } from 'react-router-dom';

export default function ProductModi() {
  const token = localStorage.getItem('token');
  const [product, setProduct] = useState([]);
  const [productImg, setProductImg] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [saleLink, setSaleLink] = useState('');
  const [btnState, setBtnstate] = useState(false);
  // 에러
  const [nameError, setNameError] = useState('');
  const [productPriceError, setProductPriceError] = useState('');
  const [saleLinkError, setSaleLinkError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  const productId = window.location.pathname.replace('/product/m/', '');

  async function fetchProductDetail() {
    try {
      const data = await productAPI.getProductDetail(token, productId);
      console.log('ddd상세', data);
      setProduct(data.product);
      setProductImg(data.product.itemImage);
      setProductName(data.product.itemName);
      setProductPrice(data.product.price);
      setSaleLink(data.product.link);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchProductDetail();
  }, []);

  const handleImageInput = async e => {
    try {
      const imageSrc = await imageAPI.uploadImg(e);
      setProductImg(imageSrc);
      console.log(imageSrc);
    } catch (error) {
      console.log(error);
    }
  };
  const handleNameChange = e => {
    const value = e.target.value;
    if (value.length >= 2 && value.length <= 15) {
      setProductName(value);
      setNameError('');
      setIsFormValid(value !== '');
    } else {
      setProductName(value);
      setNameError(value !== '' ? '이름은 2~15자 이내여야 합니다.' : '');
      setIsFormValid(false);
    }
    handler();
  };
  const handlePriceChange = e => {
    const value = e.target.value;
    if (value.length <= 9) {
      setProductPrice(value);
      setProductPriceError('');
      setIsFormValid(value !== '');
    } else {
      setProductPrice(value);
      setProductPriceError(
        value !== '' ? '가격은 최대 9자리 이내여야 합니다.' : '',
      );
      setIsFormValid(false);
    }
    handler();
  };
  const handleLinkChange = e => {
    const value = e.target.value;
    if (isValidUrl(value)) {
      setSaleLink(value);
      setSaleLinkError('');
      setIsFormValid(value !== '');
    } else {
      setSaleLink(value);
      setSaleLinkError(value !== '' ? '유효한 URL을 입력해주세요.' : '');
      setIsFormValid(false);
    }
    handler();
  };
  const isValidUrl = url => {
    const urlRegex =
      /^(http[s]?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}\/?([^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(\/[\w.-]*)*\/?$/;
    return urlRegex.test(url);
  };
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
  const handleSubmit = async e => {
    e.preventDefault();
    if (!isFormValid) {
      return; // 폼이 유효하지 않으면 제출하지 않음
    }
    try {
      console.log(
        '프로필 수정, args',
        productName,
        productPrice,
        saleLink,
        productImg,
        productId,
      );
      const result = await productAPI.productModi(
        token,
        productName,
        productPrice,
        saleLink,
        productImg,
        productId,
      );
      console.log(result);
      navigate('/profile');
    } catch (error) {
      console.error(error);
    }
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
                backgroundImage: `url(${productImg || product.itemImage})`,
                backgroundSize: 'cover',
              }}
            ></label>
            <input
              className="a11y-hidden"
              type="file"
              id="productImg"
              onChange={handleImageInput}
            />
          </section>
          <section className={styles['product-title']}>
            <div>공구 이름</div>
            <input
              className={styles['product-title-input']}
              type="text"
              placeholder={'2~15자 이내여야 합니다.'}
              defaultValue={product.itemName}
              onChange={handleNameChange}
              required
            />
            {Boolean(nameError) && nameError !== '' && (
              <p className={styles['error-message']}>{nameError}</p>
            )}
          </section>
          <section className={styles['product-title']}>
            <div>가격</div>
            <input
              className={styles['product-title-input']}
              type="number"
              placeholder="숫자만 입력 가능합니다."
              defaultValue={product.price}
              onChange={handlePriceChange}
              required
            />
            {Boolean(productPriceError) && productPriceError !== '' && (
              <p className={styles['error-message']}>{productPriceError}</p>
            )}
          </section>
          <section className={styles['product-title']}>
            <div>판매링크</div>
            <input
              className={styles['product-title-input']}
              type="text"
              placeholder="URL을 입력해 주세요"
              defaultValue={product.link}
              onChange={handleLinkChange}
              required
            />
            {saleLinkError && (
              <p className={styles['error-message']}>{saleLinkError}</p>
            )}
          </section>
        </Layout>
      </form>
    </>
  );
}
