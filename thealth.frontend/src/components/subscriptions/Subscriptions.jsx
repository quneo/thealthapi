import React from 'react'
import styles from './Subscriptions.module.css'
import avatar from "../../img/Avatar.jpg"

const subscribesData = [
    { id: 1, name: '1', image: avatar },
    { id: 2, name: '2', image: avatar },
    { id: 3, name: '3', image: avatar },
    { id: 4, name: '4', image: avatar },
    { id: 5, name: '5', image: avatar },
    { id: 6, name: '6', image: avatar },
    { id: 7, name: '7', image: avatar },
    { id: 8, name: '8', image: avatar },
    { id: 9, name: '9', image: avatar },
    { id: 10, name: '10', image: avatar },
];

function Subscriptions() {
    return (
        <div className={styles['container']}>
            <h2 className={styles['title']}>Подписки</h2>
            <div className={styles['subscriptions-list']}>
                {subscribesData.map(subscribes => (
                    <div key={subscribes.id} className={styles['subscription']}>
                        <img src={subscribes.image} alt={subscribes.name} className={styles['subscription-image']} />
                        <div className={styles['subscription-name']}>{subscribes.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Subscriptions;
