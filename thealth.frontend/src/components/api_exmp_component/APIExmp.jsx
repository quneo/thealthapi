// import React from "react";
import React, { useEffect, useState } from 'react';
import styles from "./APIExmp.module.css"
import logo from "./../../img/Logo2.png"
import iconGoogle from "./../../img/icons/icon-google.svg"
import iconApple from "./../../img/icons/icon-apple.svg"
import loginImgLeft from "./../../img/login/LoginLeft.svg"
import loginImgRight from "./../../img/login/LoginRight.svg"
import axios from 'axios';


function APIExmp() {

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleSave = async (event) => {
        event.preventDefault();

        const userData = { name, password };

        try {
            const response = await axios.post('http://localhost:3000/api/userlist', userData);

            
                alert('Data saved successfully!');
           
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred!');
        }
    };

    return (
        <div className={styles['login_form_container']} id="loginAccessRegister">
            {/* <img src={loginImgLeft} className={styles['login_img_left" alt="loginImgLeft']}/ > */}
            <img src={loginImgLeft} className={styles['login_img_left']} alt="loginImgLeft" />

            {/* ===== LOGIN ENTER ===== */}
            <div className={styles['login_access']}>
                <img src={logo} className={styles['logo" alt="logo']} />
                <h1 className={styles['login_title']}>Войдите</h1>
                <h3 className={styles['login_title2']}>чтобы перейти в свой аккаунт</h3>

                <div className={styles['login_area']}>

                    <form form onSubmit={handleSave} action="" className={styles['login_form']}>
                        <div className={styles['input_box']}>
                            <input
                                type="text"
                                id="username"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                placeholder="Имя пользователя"
                                className={styles['input_area']} />
                        </div>
                        <div className={styles['input_box']}>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Пароль"
                                className={styles['input_area']} />
                        </div>
                        <button type="submit" id="loginButtonContinue" className={styles['login_button']}>Продолжить</button>
                    </form>


                    <div>
                        <p className={styles['login_switch']}>Нет аккаунта?
                            <a href="#" id="loginButtonRegister">Зарегистрироваться</a>
                        </p>
                    </div>
                </div>
            </div>
            <img src={loginImgRight} className={styles['login_img_right']} alt="loginImgRight" />
            {/* <img src={loginImgRight} className={styles['login_img_right" alt="loginImgRight']}/ > */}

        </div>
    )

}

export default APIExmp;