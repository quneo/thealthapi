import React from 'react'
import styles from './LoginForm.module.css'
import logo from './../../img/Logo2.png'
// import iconGoogle from "./../../img/icons/icon-google.svg"
// import iconApple from "./../../img/icons/icon-apple.svg"
// import loginImgLeft from "./../../img/login/LoginLeft.svg"
// import loginImgRight from "./../../img/login/LoginRight.svg"

function LoginForm() {
	return (
		<div className={styles['login-form-container']} id='loginAccessRegister'>
			{/* ===== LOGIN ENTER ===== */}
			<div className={styles['login-access']}>
				<img src={logo} className={styles['logo']} alt='logo' />
				<h1 className={styles['login-title']}>Войдите</h1>
				<h3 className={styles['login-title2']}>чтобы перейти в свой аккаунт</h3>

				<div className={styles['login-area']}>
					<form action='' className={styles['login-form']}>
						<div className={styles['input-box']}>
							<input
								type='text'
								id='username'
								required
								placeholder='Имя пользователя'
								className={styles['input-area']}
							/>
						</div>
						<div className={styles['input-box']}>
							<input
								type='password'
								id='password'
								required
								placeholder='Пароль'
								className={styles['input-area']}
							/>
						</div>
						<button id='loginButtonEnd' className={styles['login-button']}>
							Войти
						</button>
					</form>

					<div>
						<p className={styles['login-switch']}>
							Нет аккаунта?
							<a href='#' id='loginButtonRegister'>
								Зарегистрироваться
							</a>
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LoginForm
