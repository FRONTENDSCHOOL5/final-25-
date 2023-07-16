import React, { useEffect, useState } from 'react';
import styles from './PostDetail.module.css';
import Layout from '../../components/layout/Layout';
import ProfilePost from '../../components/common/Profile/ProfilePost';
import commentAPI from '../../api/commentAPI';
import Comment from '../../components/common/Comment/Comment';
import Modal from '../../components/common/Modal/Modal';

export default function Post() {
  const token = localStorage.getItem('token');
  const accountName = localStorage.getItem('accountname');
  const [comments, setComments] = useState();
  const [isModalShow, setIsModalShow] = useState(false);
  const [modalMenu, setmodalMenu] = useState(['delete-post']);
  const [isLoading, setIsLoading] = useState(true);
  const [postId, setPostId] = useState('');
  const [commentId, setCommentId] = useState('');
  const postid = document.location.pathname.replace('/post/', '');

  console.log(postid);

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

  function getCommentId(event) {
    const closestArticle = event.target.closest('li');
    const postid = closestArticle.getAttribute('data-comment-id');
    setCommentId(postid);
  }

  const fetchComments = async () => {
    let data;

    try {
      setIsLoading(true);
      data = await commentAPI.getComments(token, postid);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }

    const sortedComments = data.comments.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    );

    setComments(sortedComments);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const loadCommentMore = newComment => {
    setComments(prev => [...prev, newComment]);
  };

  return (
    <Layout
      modalOpen={() => modalOpen(['setting', 'logout'])}
      postDetailId={postid}
      loadCommentMore={loadCommentMore}
    >
      <ProfilePost
        type="post"
        postDetailId={postid}
        modalOpen={() => modalOpen(['report-post'])}
        getPostId={getPostId}
      />
      {comments || !isLoading ? (
        <section className={styles['comment-area']}>
          <ul className={styles['comment-list']}>
            {comments.map(item => {
              return (
                <li
                  key={item.id}
                  data-comment-id={item.id}
                  data-comment-author={item.author.accountname}
                >
                  <Comment
                    data={item}
                    postId={postid}
                    modalOpen={() =>
                      modalOpen(
                        item.author.accountname === accountName
                          ? ['delete-comment']
                          : ['report-comment'],
                      )
                    }
                    getCommentId={getCommentId}
                  />
                </li>
              );
            })}
          </ul>
        </section>
      ) : (
        <></>
      )}
      {isModalShow && (
        <Modal
          modalClose={modalClose}
          modalMenu={modalMenu}
          postId={postid}
          commentId={commentId}
        />
      )}
    </Layout>
  );
}
