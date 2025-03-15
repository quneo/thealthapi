import React from 'react';
import styles from './FeedFilter.module.css';

function FeedFilter()  {
    return (
        <div className={styles['filter-container']}>
            <div className={styles['button-group']}>
                <button className={styles['button']}>Новости</button>
                <button className={styles['button']}>Рекомендации</button>
                <button className={styles['button']}>Поиск</button>
            </div>
            <div className={styles['divider']}></div>
            <div className={styles['button-group']}>
                <button className={styles['button']}>Понравившиеся</button>
                <button className={styles['button']}>Комментированные</button>
            </div>
        </div>
    );
};

export default FeedFilter;
