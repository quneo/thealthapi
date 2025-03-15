import React from 'react';
import styles from './LoginPage.module.css';
import axios from "axios";
import LoginForm from "../../components/login_form/LoginForm"

function LoginPage() {
    return (
        <div className={styles['login-page']}>
            <LoginForm />
        </div>
    )
}

export default LoginPage;