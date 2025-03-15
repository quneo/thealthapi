import React, { useState } from "react"
import axios from 'axios';
import styles from "./SignUpForm.module.css"
import logo from "../../img/Logo2.png"

function SignUpUserDataForm() {

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [gender, setGender] = useState({
        male: false,
        female: false,
    });
    const [city, setCity] = useState('');
    const [birthday, setBirthday] = useState('');

    const handleCheckboxChange = (event) => {
        const { gend, checked } = event.target;
        setGender((prev) => ({
            ...prev,
            [gend]: checked,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            name,
            surname,
            gender,
            city,
            birthday,
        };

        try {
            const response = await axios.post('API!!!!!!!!!', formData);
            //console.log('Response:', response.data); // ответ сервера в консоль
        } catch (error) {
            console.error('Error submitting form:', error); // Выводим ошибку в консоль
        }
    };

    return(
        <div className={styles['container']} id="signupAccessRegister">
            
            <div className={styles['signup-access']}>
                <h3>"back"</h3>
                <img src={logo} className={styles['logo']} alt="logo" />
                <h1 className={styles['signup-title']}>Регистрация</h1>
    
                <div className={styles['signup-area']}>
    
                    <form action="" className={styles['signup-form']}>
                        <div className={styles['input-box']}>
                            <input type="text" id="name" required placeholder="Имя" className={styles['input-area']} />
                        </div>
                        <div className={styles['input-box']}>
                            <input type="text" id="Surname" required placeholder="Gtnder" className={styles['input-area']} />
                        </div>
                        <div className={styles['input-box']}>
                            <input type="text" id="city" required placeholder="Город" className={styles['input-area']} />
                        </div>
                        <div className={styles['gender-box']}>
                            <label className={styles['gender-label']}>
                                <input type="radio" id="male" className={styles['gender-input']} />Мужчина
                            </label>
                            <label className={styles['gender-label']}>
                                <input type="radio" id="female" className={styles['gender-input']} />Женщина
                            </label>
                        </div>
                        <div className={styles['input-box']}>
                            <input type="date" id="birthday" required placeholder="День Рождения" className={styles['birthday-input']} />
                        </div>
                        <button type="submit" id="signupButtonEnd" className={styles['signup-button']}>Зарегистрироваться</button>
                    </form>

                </div>
            </div>
           
        </div>
    )
}

export default SignUpUserDataForm;