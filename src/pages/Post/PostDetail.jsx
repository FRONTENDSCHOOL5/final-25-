import React, { useEffect, useState } from 'react';
import styles from './PostDetail.module.css';
import Layout from '../../components/layout/Layout';
import ProfilePost from '../../components/common/Profile/ProfilePost';
import commentAPI from '../../api/commentAPI';
import Comment from '../../components/common/Comment/Comment';

const token = localStorage.getItem('token');

export default function Post() {
  const postId = document.location.pathname.replace('/post/', '');
  console.log(postId);

  const [comments, setComments] = useState();

  useEffect(() => {
    const fetchComments = async () => {
      const data = await commentAPI.getComments(token, postId);
      setComments(data['comments']);
    };

    fetchComments();
  }, []);

  return (
    <Layout>
      <ProfilePost type="post" postDetailId={postId} />
      {comments ? (
        <section className={styles['comment-area']}>
          <ul className={styles['comment-list']}>
            {comments.map(item => {
              return (
                <li id={item.id}>
                  <Comment data={item} postId={postId} />
                </li>
              );
            })}
          </ul>
        </section>
      ) : (
        ''
      )}
    </Layout>
  );
}
