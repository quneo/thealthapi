import React from "react";
import styles from "./SignUpForm.module.css"
import logo from "../../img/Logo2.png"

function SignUpForm() {
    return(
        <div className={styles['container']} id="signupAccessRegister">
            
            <div className={styles['signup-access']}>
                <img src={logo} className={styles['logo']} alt="logo" />
                <h1 className={styles['signup-title']}>Регистрация</h1>    
                <div className={styles['signup-area']}>
                    <form action="" className={styles['signup-form']}>
                        <div className={styles['input-box']}>
                            <input type="text" id="UserName" required placeholder="Имя пользователя" className={styles['input-area']} />
                        </div>
                        <div className={styles['input-box']}>
                            <input type="password" id="Password" required placeholder="Пароль" className={styles['input-area']} />
                        </div>
                        <div className={styles['input-box']}>
                            <input type="password" id="PasswordRepeated" required placeholder="Повторите пароль" className={styles['input-area']} />
                        </div>
                        <button id="signupButtonContinue" className={styles['signup-button']}>Продолжить</button>
                    </form>

                </div>
            </div>
           
        </div>
    )
}

export default SignUpForm;