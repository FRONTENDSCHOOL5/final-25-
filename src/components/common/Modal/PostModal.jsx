import React from 'react';
import styles from './PostModal.module.css';

export default function PostModal() {
  return (
    <section>
      <div className={styles['alert-post']}>
        <button type="button" className={styles['btn-out']}>
          채팅방 나가기
        </button>
      </div>
    </section>
  );
}
