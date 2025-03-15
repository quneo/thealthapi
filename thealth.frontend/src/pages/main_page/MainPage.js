import React, { useEffect, useState } from 'react';
import styles from './MainPage.module.css';
import axios from "axios";
import Header from '../../components/header/Header';
import ProfileWindow from '../../components/profile_window/ProfileWindow';
import Navbar from '../../components/navbar/Navbar';
import DisplayWindow from '../../components/display_window/DisplayWindow';
import Friends from '../../components/friends/Friends';
import Subscriptions from '../../components/subscriptions/Subscriptions';
import NewPost from '../../components/new_post/NewPost';
import Feed from '../../components/feed/Feed';
import FeedFilter from '../../components/feed_filter/FeedFilter';


function MainPage() {

  //-------------------------------------------------------------------------------------------------------------------------------
  // примерная логика для считывания постов с сервера (для компонента Feed)
  // Компонент MainPage: Загружает данные о постах с сервера, обрабатывает 
  //      состояние загрузки и ошибок, а затем передает полученные данные в компонент Feed.
  // Компонент Feed: Принимает массив постов и отображает каждый пост, передавая соответствующие данные в компонент Post.
  // Компонент Post: Ответственен только за отображение данных поста, которые ему переданы через пропсы.
  //-------------------------------------------------------------------------------------------------------------------------------
  // 
  // const [posts, setPosts] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //     const fetchPosts = async () => {
  //         try {
  //             const response = await fetch('https://example.com/api/posts'); // свой URL
  //             if (!response.ok) {
  //                 throw new Error('Не удалось загрузить посты');
  //             }
  //             const data = await response.json();
  //             setPosts(data); 
  //         } catch (err) {
  //             setError(err.message);
  //         } finally {
  //             setLoading(false);
  //         }
  //     };

  //     fetchPosts();
  // }, []);

  // if (loading) return <div>Загрузка...</div>;
  // if (error) return <div>Ошибка: {error}</div>;



  //Массив постов для проверки отображения. удалить после того как пропишем считывание с сервера
  const posts = [
      {
          avatar: 'avatar.png',
          username: 'Пользователь',
          text: 'текст поста',
          image: 'postImage.png',
          likesCount: 10, 
          commentsCount: 4, 
          sharesCount: 1,
      },
      {
          avatar: 'avatar2.png',
          username: 'Пользователь 2',
          text: 'Это текст второго поста.',
          image: 'postImage2.png',
          likesCount: 5, 
          commentsCount: 1,
          sharesCount: 3, 
      },
  ];

  return (
    <div className={styles['main-page']}>
      {/* <LoginForm/ > */}
      <Header/ >
      <Navbar/ >
      <ProfileWindow />
      {/* <DisplayWindow />
      <Friends />
      <Subscriptions />
      <NewPost /> */}
      {/* <Feed posts={posts} />     */}
      {/* <FeedFilter /> */}
      {/* <APIExmp />
      <ExmpCard /> */}
    </div>
  );
}

export default MainPage;