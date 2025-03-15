import React from "react";
import styles from "./ProfileWindow.module.css"
import avatar from "../../img/Avatar.jpg"

function ProfileWindow() {
    return (
        <div className={styles.container}>
            {/* <div className={styles.avatarContainer}> */}
                <div className={styles.imageContainer}>
                    <div className={styles.avatar}>
                        <img src={avatar} alt="User Avatar" className={styles.avatarImage} />
                        {/* <input type="file" id="upload-avatar" className={styles.uploadInput} accept="image/*" /> */}
                        <div className={styles.statusIndicator}></div>
                    </div>
                    {/* <div className={styles.statusIndicator}></div> */}
                </div>
                <div className={styles.userInfo}>
                    <div className={styles.username}>Имя пользователя</div>
                    <div className={styles.status}>Статус</div>
                    <button className={styles.infoButton}>Узнать больше</button>
                </div>
                <a href="#" className={styles.editLink}>Редактировать</a>
                {/* <a href="#" className={styles.editLink} onclick="openEditModal()">Редактировать</a> */}
            {/* </div> */}
            
        </div>
    )
}

export default ProfileWindow;