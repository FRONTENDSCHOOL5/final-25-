import React from 'react';
import styles from './Header.module.css';
import IconArrowLeft from '../../../assets/images/icon-arrow-left.svg';
import IconMoreVertical from '../../../assets/images/s-icon-more-vertical.svg';

export default function HeaderBar() {
    return (
        <header>
            <div className={styles['header-wrap']}>
                <button className={styles['btn-back']}>
                    <img src={IconArrowLeft} alt="뒤로가기" />
                </button>
                <button className={styles['btn-more']}>
                    <img src={IconMoreVertical} alt="메뉴보기" />
                </button>
            </div>
        </header>
    );
}
