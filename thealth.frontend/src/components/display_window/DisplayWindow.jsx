import React from 'react';
import styles from './DisplayWindow.module.css';

function DisplayWindow() {
    return (
        <div className={styles['display-window']}>
            <div className={styles['container']}>
                <div className={styles['window photo-window']}>
                    <h3>Фотографии</h3>
                    <img src="path/to/photo.jpg" alt="Фотография" className={styles['image']} />
                    {/* Замените "path/to/photo.jpg" на путь к вашему изображению */}
                </div>
                <div className={styles['window achievements-window']}>
                    <h3>Достижения</h3>
                    <img src="path/to/achievement.jpg" alt="Достижение" className={styles['image']} />
                    {/* Замените "path/to/achievement.jpg" на путь к вашему изображению */}
                </div>
                <div className={styles['window goals-window']}>
                    <h3>Цели</h3>
                    <img src="path/to/goal.jpg" alt="Цель" className={styles['image']} />
                    {/* Замените "path/to/goal.jpg" на путь к вашему изображению */}
                </div>
            </div>
            <button className={styles['view-all-button']}>Посмотреть всё</button>
        </div>
    );
};


export default DisplayWindow;
