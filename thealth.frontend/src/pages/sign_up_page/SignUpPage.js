import React from 'react';
import styles from './SignUpPage.module.css';
import axios from "axios";
import SignUpForm from '../../components/sign_up_form/SignUpForm';
import SignUpUserDataForm from '../../components/sign_up_form/SignUpUserDataForm';

function SignUpPage() {
    return (
        <div className={styles['signup-page']}>
            {/* <SignUpForm /> */}
            <SignUpUserDataForm />
        </div>
    )
}

export default SignUpPage;