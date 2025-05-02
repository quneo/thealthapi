import React, { FC, useState, useEffect, useMemo, JSX } from 'react'
import { useLocation } from 'react-router-dom'
import './style.scss'
import { Box } from '@mui/material'
import LoginPage from './login/LoginPage'
import RegisterPage from './register'

const AuthRootComponent: FC = (): JSX.Element => {
	const [email, setEmail] = useState('')
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const [repeatPassword, setRepeatPassword] = useState('')
	const [backgroundImage, setBackgroundImage] = useState('')
	const location = useLocation()

	const backgroundImages = useMemo(
		() => [
			'/img/background.jpg',
			'/img/background2.jpg',
			'/img/background3.jpg',
			'/img/background4.jpg',
		],
		[]
	)

	useEffect(() => {
		const randomIndex = Math.floor(Math.random() * backgroundImages.length)
		setBackgroundImage(backgroundImages[randomIndex])
	}, [backgroundImages])

	return (
		<Box
			className='root'
			sx={{
				width: '100%',
				height: '100vh',
				backgroundImage: `url(${backgroundImage})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
			}}
		>
			{location.pathname === '/login' ? (
				<LoginPage />
			) : location.pathname === '/register' ? (
				<RegisterPage
					login={login}
					email={email}
					password={password}
					setPassword={setPassword}
					setLogin={setLogin}
					setEmail={setEmail}
					setRepeatPassword={setRepeatPassword}
					repeatPassword={repeatPassword}
				/>
			) : null}
		</Box>
	)
}

export default AuthRootComponent
