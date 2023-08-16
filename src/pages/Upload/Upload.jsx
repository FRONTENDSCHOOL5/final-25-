import React, { useState, useEffect } from 'react';
import styles from './Upload.module.css';
import Layout from '../../components/layout/Layout';
import { useNavigate } from 'react-router-dom';
import { getAddressFromLatLng } from '../../api/mapAPI';
import uploadAPI from '../../api/uploadAPI';
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

  // 입력된 데이터의 유효성을 확인한 후 업로드 버튼 활성화 상태관리
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

  // 게시물 업로드시 postIdUpload 값이 변경되었을 때 프로필 페이지로 자동으로 이동
  useEffect(() => {
    if (postIdUpload !== '') {
      navigate(`/profile`);
    }
  }, [postIdUpload]);

  // 텍스트를 입력하면 handleTitleInputChange 함수가 호출되어 해당 텍스트가 titleInput 상태 변수에 저장
  const handleTitleInputChange = event => {
    setTitleInput(event.target.value);
  };

  // 본문을 입력하거나 수정할 때마다 이 함수가 실행되며, 입력한 내용을 textValue 상태 변수에 업데이트
  const handleTextChange = event => {
    setTextValue(event.target.value);
  };

  // 메뉴 제목을 입력하면 호출되며, 입력된 값을 setTitleInput 함수를 사용하여 titleInput 상태 변수에 업데이트
  const handleInputChange = event => {
    setTitleInput(event.target.value);
  };

  // 인원감소버튼
  const handleDecrease = () => {
    if (peopleCount > 2) {
      setPeopleCount(peopleCount - 1);
    }
  };

  // 인원증가버튼
  const handleIncrease = () => {
    if (peopleCount < 6) {
      setPeopleCount(peopleCount + 1);
    }
  };

  // 메뉴 제목, 텍스트 내용, 장소, 날짜 중 하나라도 입력하거나 선택한 경우에는 입력 필드의 스타일이 변경
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

  // DatePicker 컴포넌트에서 사용자가 날짜를 선택할 때 호출되므로, 선택된 날짜를 처리하고 UI를 업데이트
  const handleDateChange = date => {
    setSelectedDate(date);
  };

  // 현재 날짜와 시간을 가져와서 문자열로 형식화
  const currentDateTime = new Date();
  const currentDateTimeString = currentDateTime.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  // 주어진 함수를 사용하여 KakaoAPI에서 위치 정보를 가져오고, 해당 정보를 화면에 표시
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

  // 이미지 업로드
  const handlePhotoChange = event => {
    const files = event.target.files;
    const updatedItems = [...photoItems];
    const remainingSlots = 3 - updatedItems.length;

    const filesArray = Array.from(files);
    const filesToAdd = filesArray.slice(
      0,
      Math.min(remainingSlots, filesArray.length),
    );

    const uploadPromises = filesToAdd.map(fileToAdd => {
      if (fileToAdd) {
        return imagesAPI.uploadImage(fileToAdd);
      } else {
        return Promise.reject('No file to upload');
      }
    });

    Promise.all(uploadPromises)
      .then(newImages => {
        setPhotoItems([...updatedItems, ...newImages]);

        if (updatedItems.length + newImages.length === 3) {
          setModalType('notice');
          setIsModalOpen(true);
        }
      })
      .catch(error => {
        console.error('이미지 업로드 오류:', error);
      });

    if (remainingSlots <= 0) {
      setModalType('notice');
      setIsModalOpen(true);
      return;
    }
  };

  // 3장이상일때의 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 올린 사진 삭제
  const handleRemovePhoto = index => {
    const updatedItems = [...photoItems];
    updatedItems.splice(index, 1);
    setPhotoItems(updatedItems);
  };

  const token = localStorage.getItem('token');

  // 업로드버튼 활성화 후 데이터 넘기기
  const handleSubmit = e => {
    e.preventDefault();
    if (!titleInput || !textValue || !placeInput || !selectedDate) {
      return;
    }

    // 업로드한 이미지 파일 이름을 하나의 문자열로 합치기
    const imagesString = photoItems.join(',');

    // 데이터 계획 생성
    const dataPlan = {
      menu: titleInput,
      title: titleInput + ' 먹을 사람?',
      date: selectedDate,
      people: peopleCount + '명',
      place: placeInput,
      images: imagesString, // 합쳐진 이미지 파일 이름 추가
    };
    const jsonDataPlan = JSON.stringify(dataPlan);
    const contents = textValue + jsonDataPlan;

    // 컨텐츠를 서버로 보내기
    fetchPostUpload(contents);
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
