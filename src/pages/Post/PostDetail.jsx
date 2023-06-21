import React from 'react';
import styles from './PostDetail.module.css';
import Layout from '../../components/layout/Layout';
import ProfilePost from '../../components/common/Profile/ProfilePost';
import Comment from '../../components/common/Comment/Comment';

export default function Post() {
  return (
    <Layout>
      <ProfilePost type="post" />
      <section className={styles['comment-area']}>
        <ul className={styles['comment-list']}>
          <li>
            <Comment />
          </li>
        </ul>
      </section>
    </Layout>
  );
}
