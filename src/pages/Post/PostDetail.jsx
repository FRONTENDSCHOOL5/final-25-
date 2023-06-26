import React, { useEffect, useState } from 'react';
import styles from './PostDetail.module.css';
import Layout from '../../components/layout/Layout';
import ProfilePost from '../../components/common/Profile/ProfilePost';
import commentAPI from '../../api/commentAPI';
import Comment from '../../components/common/Comment/Comment';
import Modal from '../../components/common/Modal/Modal';

export default function Post() {
  const token = localStorage.getItem('token');
  const [isModalShow, setIsModalShow] = useState(false);
  const [modalMenu, setmodalMenu] = useState(['delete-post']);
  const [postId, setPostId] = useState('');
  const postid = document.location.pathname.replace('/post/', '');
  console.log(postid);

  const [comments, setComments] = useState();

  useEffect(() => {
    const fetchComments = async () => {
      const data = await commentAPI.getComments(token, postid);
      setComments(data['comments']);
    };

    fetchComments();
  }, []);

  function modalOpen(menu) {
    setIsModalShow(true);
    setmodalMenu(menu);
  }

  function modalClose(event) {
    if (event.target === event.currentTarget) {
      setIsModalShow(false);
    }
  }

  function getPostId(event) {
    const closestArticle = event.target.closest('article');
    const postid = closestArticle.getAttribute('data-id');
    setPostId(postid);
  }

  return (
    <Layout modalOpen={() => modalOpen(['setting', 'logout'])}>
      <ProfilePost
        type="post"
        postDetailId={postid}
        modalOpen={() => modalOpen(['report-post'])}
        getPostId={getPostId}
      />
      {comments ? (
        <section className={styles['comment-area']}>
          <ul className={styles['comment-list']}>
            {comments.map(item => {
              return (
                <li id={item.id}>
                  <Comment data={item} postId={postid} />
                </li>
              );
            })}
          </ul>
        </section>
      ) : (
        ''
      )}
      {isModalShow && (
        <Modal modalClose={modalClose} modalMenu={modalMenu} postId={postId} />
      )}
    </Layout>
  );
}
