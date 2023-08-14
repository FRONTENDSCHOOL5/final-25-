import React, { useState, useEffect } from 'react';
import styles from './Upload.module.css';
import Layout from '../../components/layout/Layout';
import { useNavigate } from 'react-router-dom';
import { getAddressFromLatLng } from '../../api/mapAPI';
import uploadAPI from '../../api/uploadAPI';
// import imageAPI from '../../api/imageAPI';
import imagesAPI from '../../api/imagesAPI';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import AlertModal from '../../components/common/Modal/AlertModal/AlertModal';
import minusIcon from '../../assets/images/minus.svg';
import minusActiveIcon from '../../assets/images/minus-active.svg';
import plusIcon from '../../assets/images/plus.svg';
import plusActiveIcon from '../../assets/images/plus-active.svg';

function Upload() {
  const [btnState, setBtnState] = useState(false);
  const [titleInput, setTitleInput] = useState('');
  const [textValue, setTextValue] = useState('');
  const [placeInput, setPlaceInput] = useState('');
  const [peopleCount, setPeopleCount] = useState(2);
  const [photoItems, setPhotoItems] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [modalType, setModalType] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postId, setPostId] = useState('');
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [peopleInputClass, setPeopleInputClass] = useState(
    `${styles['btn-people-num']} ${styles['btn-people-num-text']}`,
  );
  const { postId: postIdUpload, fetchPost: fetchPostUpload } = uploadAPI();

  useEffect(() => {
    if (
      (titleInput.trim() !== '' &&
        textValue.trim() !== '' &&
        selectedDate !== '' &&
        placeInput.trim() !== '') ||
      selectedPhoto !== null ||
      photoItems.length > 0
    ) {
      setBtnState(true);
    } else {
      setBtnState(false);
    }
  }, [
    titleInput,
    textValue,
    selectedDate,
    placeInput,
    selectedPhoto,
    photoItems,
  ]);
  useEffect(() => {
    if (postIdUpload !== '') {
      navigate(`/profile`);
    }
  }, [postIdUpload]);

  const handleTitleInputChange = event => {
    setTitleInput(event.target.value);
  };

  const handleTextChange = event => {
    setTextValue(event.target.value);
  };

  const handleDecrease = () => {
    if (peopleCount > 2) {
      setPeopleCount(peopleCount - 1);
    }
  };

  const handleIncrease = () => {
    if (peopleCount < 6) {
      setPeopleCount(peopleCount + 1);
    }
  };

  const handleInputChange = event => {
    setTitleInput(event.target.value);
  };

  useEffect(() => {
    if (
      titleInput.trim() ||
      textValue.trim() ||
      placeInput.trim() ||
      selectedDate
    ) {
      setPeopleInputClass(
        `${styles['btn-people-num']} ${styles['input-filled']}`,
      );
    } else {
      setPeopleInputClass(
        `${styles['btn-people-num']} ${styles['input-blur']}`,
      );
    }
  }, [textValue, titleInput, placeInput, selectedDate]);

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const currentDateTime = new Date();
  const currentDateTimeString = currentDateTime.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  // 주어진 함수를 사용하여 Kakao API에서 위치 정보를 가져오고, 해당 정보를 화면에 표시합니다.
  useEffect(() => {
    // 위치 감시 시작
    const watchId = navigator.geolocation.watchPosition(
      position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // 위도와 경도를 이용하여 주소를 가져오기 위해 getAddressFromLatLng 함수 호출
        getAddressFromLatLng(latitude, longitude)
          .then(address => {
            setCurrentLocation(
              address || `위도: ${latitude}, 경도: ${longitude}`,
            );
          })
          .catch(error => {
            console.error('Error getting address:', error);
            setCurrentLocation(`위도: ${latitude}, 경도: ${longitude}`);
          });
      },
      error => {
        // 위치를 가져오는 데 실패한 경우 처리할 로직을 여기에 작성하세요.
        console.error('Error getting current location:', error);
        setCurrentLocation('위치 정보를 가져오는 데 실패했습니다.');
      },
    );

    // 컴포넌트 언마운트 시 위치 감시 종료
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  //사진올리기
  const handlePhotoChangeT = async event => {
    // 이벤트로부터 선택된 파일들을 가져옵니다.
    const files = event.target.files;
    console.log(files);

    // 선택된 파일이 있는지 확인합니다.
    if (files.length === 0) {
      return;
    }

    // 남은 슬롯 수를 계산합니다.
    const updatedItems = [...photoItems];
    console.log(updatedItems);
    const remainingSlots = 3 - updatedItems.length;

    // for (let i = 0; i < files.length; i++) {
    //   const file = files[i];
    //   try {
    //     const imageUrl = await imagesAPI.uploadImg(file);
    //     updatedItems.push(imageUrl);
    //   } catch (error) {
    //     console.error('Error uploading image:', error);
    //   }
    // }

    setPhotoItems(updatedItems);
    if (updatedItems.length === 3) {
      setModalType('notice');
      setIsModalOpen(true);
    }
  };

  // ===== 원래 handlephotochange
  const handlePhotoChange = event => {
    // console.log('its working');
    const files = event.target.files;
    const updatedItems = [...photoItems];
    const remainingSlots = 3 - updatedItems.length;

    if (remainingSlots === 0) {
      setModalType('notice');
      setIsModalOpen(true);
      return;
    }

    const filesToAdd = Array.from(files).slice(0, remainingSlots);

    console.log(filesToAdd);

    const imageBody = new FormData();

    filesToAdd.forEach(file => {
      imageBody.append('image', file);
    });

    console.log(imageBody);

    fetchImages().then(newImages => {
      const filteredImages = newImages.filter(
        imageUrl => !updatedItems.includes(imageUrl),
      );
      setPhotoItems([...updatedItems, ...filteredImages]);

      if (updatedItems.length + filteredImages.length === 3) {
        setModalType('notice');
        setIsModalOpen(true);
      }
    });

    async function fetchImages() {
      const response = await fetch(
        'https://api.mandarin.weniv.co.kr/image/uploadfiles',
        {
          method: 'POST',
          header: {
            'Content-type': 'multipart/form-data',
          },
          body: imageBody,
        },
      );

      const data = await response.json();
      console.log('images', data);

      const newImages = data.map(
        item => 'https://api.mandarin.weniv.co.kr/' + item.filename,
      );
      return newImages;
    }
    // for (let i = 0; i < filesToAdd.length; i++) {
    //   const file = filesToAdd[i];
    //   const url = URL.createObjectURL(file);
    //   updatedItems.push(url);
    // }

    console.log(photoItems);
    if (updatedItems.length === 3) {
      setModalType('notice');
      setIsModalOpen(true);
    }
  };

  //3장이상일때의 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
  };

  //올린 사진 삭제
  const handleRemovePhoto = index => {
    const updatedItems = [...photoItems];
    updatedItems.splice(index, 1);
    setPhotoItems(updatedItems);
  };

  const token = localStorage.getItem('token');

  //업로드버튼 활성화 후 데이터 넘기기
  const handleSubmit = e => {
    e.preventDefault();
    if (!titleInput || !textValue || !placeInput || !selectedDate) {
      return;
    }

    const dataPlan = {
      menu: titleInput,
      title: titleInput + ' 먹을 사람?',
      date: selectedDate,
      people: peopleCount + '명',
      place: placeInput,
    };
    const jsonDataPlan = JSON.stringify(dataPlan);
    console.log('json1', jsonDataPlan);
    const imagesString = photoItems.join(',');
    const contents = textValue + jsonDataPlan;

    // 변경된 postIdUpload와 fetchPostUpload를 사용합니다.
    fetchPostUpload(contents, imagesString);

    // handlePhotoChange();
  };

  //데이터 넘긴 후 프로필로 이동
  useEffect(() => {
    if (postId !== '') {
      navigate(`/profile`);
    }
  }, [postId]);

  return (
    <>
      <div
        className={`upload-wrapper ${isModalOpen ? styles['modal-open'] : ''}`}
      >
        <form onSubmit={handleSubmit}>
          <Layout btnHandler={btnState}>
            <section className="wrap">
              <h1 className="a11y-hidden">게시물 작성</h1>
              <article className={`${styles['title-wrap']} ${styles['line']}`}>
                <div className={styles['title-inner']}>
                  <span className={styles['title-user']}>
                    {titleInput.length > 6
                      ? `${titleInput.slice(0, 6)}...`
                      : titleInput}
                  </span>
                  <span className={styles['title-user-default']}>
                    같이 먹을 사람?
                  </span>
                </div>
              </article>
              <section className="body-wrap">
                <article>
                  <textarea
                    className={styles['text-box']}
                    placeholder="신전떡볶이 패밀리 세트 먹을 사람~ 여기~ 여기~ 붙어라~!"
                    value={textValue}
                    onChange={handleTextChange}
                    maxLength="50"
                  ></textarea>
                  <div className={styles['text-count']}>
                    {textValue.length}/50
                  </div>
                </article>
                <article>
                  <ul className={styles['items-wrap']}>
                    <li
                      className={`${styles['item-menu']} ${styles['item-all']}`}
                    >
                      메뉴
                      <div className={styles['item-input']}>
                        <input
                          type="text"
                          className={`${styles['title-user-input-menu']} ${styles['title-ellipsis']}`}
                          value={titleInput}
                          onChange={handleTitleInputChange}
                          placeholder="신전떡볶이"
                        />
                      </div>
                    </li>
                    <li
                      className={`${styles['item-people']} ${styles['item-all']}`}
                    >
                      인원
                      <div
                        className={`${styles['people-wrap']} ${styles['item-input']}`}
                      >
                        <button
                          type="button"
                          className={`${styles['btn-people']} ${styles['minus']}`}
                          onClick={handleDecrease}
                          style={{
                            cursor: peopleCount === 2 ? 'unset' : 'pointer',
                          }}
                        >
                          {peopleCount === 2 ? (
                            <img src={minusIcon} alt="Minus Icon" />
                          ) : (
                            <img
                              src={minusActiveIcon}
                              alt="Minus Active Icon"
                            />
                          )}
                        </button>
                        <input
                          className={peopleInputClass}
                          placeholder="2"
                          type="number"
                          value={peopleCount}
                          readOnly
                          onChange={handleInputChange}
                        />
                        <button
                          type="button"
                          className={`${styles['btn-people']} ${styles['plus']}`}
                          onClick={handleIncrease}
                          style={{
                            cursor: peopleCount > 6 ? 'unset' : 'pointer',
                          }}
                        >
                          {peopleCount >= 6 ? (
                            <img src={plusIcon} alt="Plus Icon" />
                          ) : (
                            <img src={plusActiveIcon} alt="Plus Active Icon" />
                          )}
                        </button>
                      </div>
                    </li>
                    <li
                      className={`${styles['item-date']} ${styles['item-all']}`}
                    >
                      날짜
                      <div className={styles['item-input']}>
                        <DatePicker
                          placeholderText={currentDateTimeString}
                          className={styles['item-input-date']}
                          locale={ko}
                          selected={selectedDate}
                          onChange={handleDateChange}
                          showTimeSelect
                          minDate={new Date()}
                          minTime={new Date().setHours(0, 0, 0)}
                          maxTime={new Date().setHours(23, 30, 0)}
                          dateFormat="yyyy. MM. dd. aa h:mm"
                        />
                      </div>
                    </li>
                    <li
                      className={`${styles['item-place']} ${styles['item-all']}`}
                    >
                      장소
                      <div className={styles['item-input']}>
                        <input
                          type="text"
                          className={styles['item-input-text']}
                          value={placeInput}
                          onChange={event => setPlaceInput(event.target.value)}
                          placeholder={currentLocation} // 현재 위치를 placeholder로 설정
                        />
                      </div>
                    </li>
                  </ul>
                </article>
                <article className={styles['photo']}>
                  {photoItems.map((photo, index) => (
                    <div className={styles['photo-item']} key={index}>
                      <img src={photo} className={styles['photo-img']} alt="" />
                      <button
                        type="button"
                        className={styles['btn-close']}
                        onClick={() => handleRemovePhoto(index)}
                      ></button>
                    </div>
                  ))}
                </article>
                <section className={styles['upload-wrap']}>
                  <div className={styles['upload-photo']}>
                    <div className={styles['btn-photo']}>
                      <input
                        type="file"
                        id="btn-photo-input"
                        className={styles['btn-photo-input']}
                        accept="image/jpg, image/jpeg, image/png"
                        multiple
                        onChange={handlePhotoChange}
                      />
                      <label
                        htmlFor="btn-photo-input"
                        className={styles['btn-photo-label']}
                      ></label>
                    </div>
                  </div>
                </section>
              </section>
            </section>
          </Layout>
        </form>
        {isModalOpen && (
          <AlertModal
            type={modalType}
            modalOpen={isModalOpen}
            modalClose={closeModal}
          />
        )}
      </div>
    </>
  );
}

export default Upload;
