import React, { useEffect, useState } from 'react';
import styles from './Post.module.css';

function Post ( {avatar, username, text, image, comments, likesCount, commentsCount, sharesCount} ) {
    return (
        <div className={styles['post']}>
            <div className={styles['header']}>
                <img src={avatar} alt={`${username}'s avatar`} className={styles['avatar']} />
                <div className={styles['user-info']}>
                    <span className={styles['username']}>{username}</span>
                    <span className={styles['date']}>Дата и время публикации</span> {/* Рекомендуется разместить здесь */}
                </div>
            </div>
            <p className={styles['text']}>{text}</p>
            {image && <img src={image} alt="Post content" className={styles['post-image']} />}
            <div className={styles['actions']}>
                <div className={styles['action-item']}>
                    <span className={styles['action-count']}>{likesCount}</span>
                    <button className={styles['action-button']}>Лайк</button>
                </div>
                <div className={styles['action-item']}>
                    <span className={styles['action-count']}>{commentsCount}</span>
                    <button className={styles['action-button']}>Комментарий</button>
                </div>
                <div className={styles['action-item']}>
                    <span className={styles['action-count']}>{sharesCount}</span>
                    <button className={styles['action-button']}>Репост</button>
                </div>
            </div>
            {/* <div className={styles['comments']}>
                {comments.map((comment, index) => (
                    <div key={index} className={styles['comment']}>
                        <span className={styles['comment-user ']}>{comment.username}: </span>
                        <span className={styles['comment-text']}>{comment.text}</span>
                    </div>
                ))}
            </div> */}
        </div>
    );
};

//--------------------------------------------------
//   ПРИМЕР ПОСТА, КОТОРЫЙ БЕРЁТ ДАННЫЕ С СЕРВЕРА
//--------------------------------------------------

// function Post ({postId}) {
//     const [post, setPost] = useState(null); // данных о посте
//     const [loading, setLoading] = useState(true); // Состояние загрузки
//     const [error, setError] = useState(null); // Состояние ошибки

//     useEffect(() => {
//         const fetchPost = async () => {
//             try {
//                 const response = await fetch(`https://example.com/api/posts/${postId}`); // свой URL
//                 if (!response.ok) {
//                     throw new Error('Не удалось загрузить пост');
//                 }
//                 const data = await response.json();
//                 setPost(data);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchPost();
//     }, [postId]);

//     if (loading) {
//         return <div>Загрузка...</div>;
//     }

//     if (error) {
//         return <div>Ошибка: {error}</div>;
//     }

//     if (!post) {
//         return null; // Если пост не загружен, ничего не отображаем
//     }

//     return (
//         <div className={styles['post']}>
//             <div className={styles['header']}>
//                 <img src={post.avatar} alt={`${post.username}'s avatar`} className={styles['avatar']} />
//                 <h3 className={styles['username']}>{post.username}</h3>
//             </div>
//             <p className={styles['text']}>{post.text}</p>
//             {post.image && <img src={post.image} alt="Post content" className={styles['image']} />}
//             <div className={styles['footer']}>
//                 <span>{post.likesCount} Лайков</span>
//                 <span>{post.commentsCount} Комментариев</span>
//                 <span>{post.sharesCount} Репостов</span>
//             </div>
//             <div className={styles['comments']}>
//                 {post.comments.map((comment, index) => (
//                     <div key={index} className={styles['comment']}>
//                         <strong>{comment.username}</strong>: {comment.text}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

export default Post;
