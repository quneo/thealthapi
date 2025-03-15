import React from 'react';
import Post from '../post/Post'
import styles from './Feed.module.css';

function Feed({ posts }) {
    
    //Для сервера этот кусок

    // return (
    //     <div className={styles.feed}>
    //         {posts.map((post) => (
    //             <Post 
    //                 key={post.id}
    //                 avatar={post.avatar} 
    //                 username={post.username} 
    //                 text={post.text} 
    //                 image={post.image} 
    //                 likesCount={post.likesCount} 
    //                 commentsCount={post.commentsCount} 
    //                 sharesCount={post.sharesCount} 
    //                 comments={post.comments}
    //             />
    //         ))}
    //     </div>
    // );

    //этот return для массива который передаю вручную из мэйнпэйдж. чтобы посмотреть как отображаются посты
    return (
        <div className={styles.feed}>
            {posts.map((post, index) => (
                <Post 
                    key={index}
                    avatar={post.avatar} 
                    username={post.username} 
                    text={post.text} 
                    image={post.image} 
                    likesCount={post.likesCount} 
                    commentsCount={post.commentsCount} 
                    sharesCount={post.sharesCount} 
                    comments={post.comments} 
                />
            ))}
        </div>
    );
};

export default Feed;
