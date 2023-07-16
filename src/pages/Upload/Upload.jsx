import React, { useState, useEffect } from 'react';
import styles from './Upload.module.css';
import Layout from '../../components/layout/Layout';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import { useNavigate } from 'react-router-dom';
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
  const [peopleInputClass, setPeopleInputClass] = useState(
    `${styles['btn-people-num']} ${styles['btn-people-num-text']}`,
  );

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

  const handleRemovePhoto = index => {
    const updatedItems = [...photoItems];
    updatedItems.splice(index, 1);
    setPhotoItems(updatedItems);
  };

  const handlePhotoChange = event => {
    const files = event.target.files;
    const updatedItems = [...photoItems];
    const remainingSlots = 3 - updatedItems.length;

    if (remainingSlots === 0) {
      setModalType('photo-notice');
      setIsModalOpen(true);
      return;
    }

    const filesToAdd = Array.from(files).slice(0, remainingSlots);

    for (let i = 0; i < filesToAdd.length; i++) {
      const file = filesToAdd[i];
      const url = URL.createObjectURL(file);
      updatedItems.push(url);
    }

    setPhotoItems(updatedItems);
    if (updatedItems.length === 3) {
      setModalType('photo-notice');
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const token = localStorage.getItem('token');

  const handleSubmit = e => {
    e.preventDefault();
    if (!titleInput || !textValue || !placeInput || !selectedDate) {
      return;
    }

    const formattedPlanDate = formatPlanDate(selectedDate);

    const dataPlan = {
      menu: titleInput,
      title: titleInput + ' 먹을 사람?',
      date: formattedPlanDate,
      people: peopleCount + '명',
      place: placeInput,
    };

    const jsonDataPlan = JSON.stringify(dataPlan);
    console.log('json1', jsonDataPlan);

    const contents = textValue + jsonDataPlan;
    fetchPost();
    console.log(contents);
    console.log('타입', typeof contents);
    console.log(postId);

    async function fetchPost() {
      try {
        const response = await fetch('https://api.mandarin.weniv.co.kr/post', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            post: {
              content: contents,
              image: [...photoItems, selectedPhoto],
            },
          }),
        });
        const data = await response.json();
        console.log('DDDDD', data);
        setPostId(data['post']['id']);
      } catch (error) {
        console.log(error);
      }
    }
  };

  function formatPlanDate(date) {
    const currentDate = new Date();
    const targetDate = new Date(date);

    const isToday = currentDate.toDateString() === targetDate.toDateString();

    if (isToday) {
      const hours = targetDate.getHours();
      const minutes = targetDate.getMinutes();
      return `오늘, ${hours}시 ${minutes}분`;
    } else {
      const tomorrow = new Date(currentDate);
      tomorrow.setDate(currentDate.getDate() + 1);

      const isTomorrow = tomorrow.toDateString() === targetDate.toDateString();

      if (isTomorrow) {
        const hours = targetDate.getHours();
        const minutes = targetDate.getMinutes();
        return `내일, ${hours}시 ${minutes}분`;
      } else {
        const month = String(targetDate.getMonth() + 1).padStart(2, '0');
        const day = String(targetDate.getDate()).padStart(2, '0');
        const hours = targetDate.getHours();
        const minutes = targetDate.getMinutes();
        return `${month}/${day} ${hours}시 ${minutes}분`;
      }
    }
  }

  useEffect(() => {
    if (postId !== '') {
      navigate(`/post/${postId}`);
    }
  }, [postId]);

  const currentDateTime = new Date();
  const currentDateTimeString = currentDateTime.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  /*global kakao*/
  // const Location = () => {
  //   useEffect(() => {
  //     const container = document.getElementById('map');
  //     const options = {
  //       center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
  //       level: 3,
  //     };

  //     const map = new kakao.maps.Map(container, options);
  //     const markerPosition = new kakao.maps.LatLng(
  //       37.365264512305174,
  //       127.10676860117488,
  //     );
  //     const marker = new kakao.maps.Marker({
  //       position: markerPosition,
  //     });
  //     marker.setMap(map);
  //   }, []);
  // };

  return (
    <>
      <div
        className={`upload-wrapper ${isModalOpen ? styles['modal-open'] : ''}`}
      >
        <form onSubmit={handleSubmit}>
          <Layout btnHandler={btnState}>
            <section className="body-wrap">
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
                          placeholder="위니브"
                        />
                      </div>
                    </li>
                  </ul>
                  {/* <div id="map" style={{ width: '390px', height: '200px' }}></div> */}
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
                        onChange={handlePhotoChange}
                        multiple
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
