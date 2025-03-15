import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./ExmpCard.module.css"

function ExmpCard() {

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/userlist');
                setUserData(response.data);
            } catch (error) {
                alert(`Ошибка: ${error.response?.data?.message || 'Неизвестная ошибка'}`);
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className={styles['card']}>
            {/* {image && <img src={image} alt={title} className={styles['card-image']} />} */}
            {userData ? (
                <div className={styles['card-content']}>
                    <h2 className={styles['card-title']}>{userData.name}Title</h2>
                    <p className={styles['card-text']}>{userData.password}Content</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

export default ExmpCard;