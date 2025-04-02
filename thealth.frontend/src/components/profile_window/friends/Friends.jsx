import React from 'react'
import styles from './Friends.module.css'
import avatar from "../../img/Avatar.jpg"

const friendsData = [
    { id: 1, name: 'Алексей', image: avatar },
    { id: 2, name: 'Мария', image: avatar },
    { id: 3, name: 'Иван', image: avatar },
    { id: 4, name: 'Ольга', image: avatar },
    { id: 5, name: 'Дмитрий', image: avatar },
    { id: 6, name: 'Анна', image: avatar },
    { id: 7, name: 'Сергей', image: avatar },
    { id: 8, name: 'Елена', image: avatar },
    { id: 9, name: 'Петр', image: avatar },
    { id: 10, name: 'Татьяна', image: avatar },
];

function Friends() {
    return (
        <div className={styles['container']}>
            <h2 className={styles['title']}>Друзья</h2>
            <div className={styles['friends-list']}>
                {friendsData.map(friend => (
                    <div key={friend.id} className={styles['friend']}>
                        <img src={friend.image} alt={friend.name} className={styles['friend-image']} />
                        <div className={styles['friend-name']}>{friend.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Friends;
