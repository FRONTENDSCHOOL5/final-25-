import React, { useState, useEffect } from 'react';
import styles from './Upload.module.css';
import Layout from '../../components/layout/Layout';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import { useNavigate } from 'react-router-dom';

function Upload() {
  const [btnState, setBtnState] = useState(false);
  const [titleInput, setTitleInput] = useState('');
  const [textValue, setTextValue] = useState('');
  const [placeInput, setPlaceInput] = useState('');
  const [peopleCount, setPeopleCount] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('');
  useEffect(() => {
    if (
      (titleInput.trim() !== '' &&
        placeInput.trim() !== '' &&
        textValue.trim() !== '') ||
      selectedPhoto !== null
    ) {
      setBtnState(true);
    } else {
      setBtnState(false);
    }
  }, [titleInput, placeInput, textValue, selectedPhoto]);

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
    if (peopleCount > 1) {
      setPeopleCount(peopleCount - 1);
    }
  };

  const handleIncrease = () => {
    if (peopleCount < 100) {
      setPeopleCount(peopleCount + 1);
    }
  };
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

  const handleSubmit = e => {
    e.preventDefault();

    if (!titleInput || !placeInput || !selectedPhoto) {
      return;
    }

    console.log('Sending request:', {
      product: {
        post: {
          content: {
            menu: titleInput + ' 먹을 사람?',
            title: titleInput,
            date: selectedDate,
            people: peopleCount + '명',
            place: placeInput,
          },
          image: selectedPhoto,
        },
      },
    });

    fetch('https://api.mandarin.weniv.co.kr/product', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        product: {
          post: {
            content: {
              menu: titleInput,
              title: titleInput,
              date: selectedDate,
              people: peopleCount,
              place: placeInput,
            },
            image: selectedPhoto,
          },
        },
      }),
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        navigate('/post/:accountname/userpost');
      })
      .catch(error => ('Error:', error));
  };

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
                        readOnly
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
                      ></button>
                      <input
                        className={`${styles['btn-people-num']}`}
                        placeholder="0"
                        type="number"
                        value={peopleCount}
                        readOnly
                      />
                      <button
                        type="button"
                        className={`${styles['btn-people']} ${styles['plus']}`}
                        onClick={handleIncrease}
                      ></button>
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
