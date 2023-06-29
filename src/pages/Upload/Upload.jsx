import React, { useState, useEffect } from 'react';
import styles from './Upload.module.css';
import Layout from '../../components/layout/Layout';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import { useNavigate } from 'react-router-dom';
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
  const [selectedPhoto, setSelectedPhoto] = useState(null);
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
      selectedPhoto !== null
    ) {
      setBtnState(true);
    } else {
      setBtnState(false);
    }
  }, [titleInput, textValue, selectedDate, placeInput, selectedPhoto]);

  const handleBtnClick = () => {
    setBtnState(!btnState);
  };

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

  useEffect(() => {
    if (peopleCount === 2) {
      setPeopleInputClass(styles['input-people-min']);
    } else {
      setPeopleInputClass(styles['btn-people-num']);
    }
  }, [peopleCount]);

  // 선택된 날짜를 상태로 설정
  const handleDateChange = date => {
    setSelectedDate(date);
  };
  const handleRemovePhoto = () => {
    setSelectedPhoto(null);
  };

  const handlePhotoChange = event => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = e => {
      setSelectedPhoto(e.target.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const token = localStorage.getItem('token');

  const handleSubmit = e => {
    e.preventDefault();
    if (!titleInput || !placeInput || !selectedDate) {
      return;
    }

    // 데이터 수정
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
              image: selectedPhoto,
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

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Layout btnHandler={btnState}>
          <section className="wrap">
            <h1 className="a11y-hidden">게시물 작성</h1>
            <article className={`${styles['title-wrap']} ${styles['line']}`}>
              <div className={styles['title-inner']}>
                <input
                  type="text"
                  className={styles['title-user-input']}
                  value={titleInput}
                  onChange={handleTitleInputChange}
                  placeholder="신전떡볶이"
                  readOnly
                />
                같이 먹을 사람?
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
                        className={styles['title-user-input-menu']}
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
                          <img src={minusActiveIcon} alt="Minus Active Icon" />
                        )}
                      </button>
                      <input
                        className={peopleInputClass}
                        placeholder="2"
                        type="number"
                        value={peopleCount}
                        readOnly
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
                        placeholderText="0000/00/00/ 오전 0:00"
                        className={styles['item-input-date']}
                        locale={ko}
                        selected={selectedDate}
                        onChange={handleDateChange} // handleDateChange 함수를 등록
                        showTimeSelect
                        minDate={new Date()}
                        minTime={new Date().setHours(0, 0, 0)}
                        maxTime={new Date().setHours(23, 30, 0)}
                        dateFormat="yyyy/MM/dd/ aa h:mm"
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
              </article>
              <article className={styles['photo']}>
                <div className={styles['photo-item']}>
                  {selectedPhoto && (
                    <>
                      <img
                        src={selectedPhoto}
                        className={styles['photo-img']}
                        alt=""
                      />
                      <button
                        type="button"
                        className={styles['btn-close']}
                        onClick={handleRemovePhoto}
                      ></button>
                    </>
                  )}
                </div>
              </article>
            </section>
            <section className={styles.photos}>
              <div className={styles['btn-photo']}>
                <input
                  type="file"
                  id="btn-photo-input"
                  className={styles['btn-photo-input']}
                  onChange={handlePhotoChange}
                />
                <label
                  htmlFor="btn-photo-input"
                  className={styles['btn-photo-label']}
                ></label>
              </div>
              <div className={styles['upload-photo']}></div>
            </section>
          </section>
        </Layout>
      </form>
    </>
  );
}

export default Upload;
