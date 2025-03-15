import React from 'react';
import styles from './NewPost.module.css';

function NewPost() {
    const handleClick = () => {
        
        alert('Создание нового поста');
    };

    return (
        <div className={styles['new-post']}>
            <button className={styles['new-post-button']} onClick={handleClick}>
                Создать новый пост
            </button>
        </div>
    );
};

export default NewPost;
