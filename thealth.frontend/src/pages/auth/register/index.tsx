import React, { FC, JSX } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField, Button, Typography, Box } from '@mui/material'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { instance } from '../../../utils/Axios'

interface RegisterPageProps {
	login: string
	email: string
	password: string
	repeatPassword: string
	setPassword: (value: string) => void
	setLogin: (value: string) => void
	setEmail: (value: string) => void
	setRepeatPassword: (value: string) => void
}

const RegisterPage: FC<RegisterPageProps> = ({
	email,
	login,
	password,
	setEmail,
	setLogin,
	setPassword,
	setRepeatPassword,
}): JSX.Element => {
	const navigate = useNavigate()

	const BackToLoginPage = () => {
		navigate('/login')
	}

	const handleSubmit = async (event: { preventDefault: () => void }) => {
		event.preventDefault()
		if (!setPassword) {
		}
		if (!setLogin) {
		} else {
			{
				const userData = {
					username: login,
					password: password,
					email: email,
				}
				const user = await instance.post('/api/userlist/', userData)
				console.log(user.data)
			}
		}
	}

	return (
		<Box>
			<KeyboardBackspaceIcon
				sx={{ cursor: 'pointer' }}
				onClick={BackToLoginPage}
				aria-label='Назад'
			/>
			<Typography variant='h6'>Создание аккаунта</Typography>

			<Typography noWrap>
				Ваш логин будет использоваться <br /> для входа в аккаунт
			</Typography>
			<TextField
				label='логин'
				placeholder='Введите Ваш логин'
				onChange={event => setLogin(event.target.value)}
			/>

			<TextField
				type='password'
				label='пароль'
				placeholder='Введите Ваш пароль'
				onChange={event => setPassword(event.target.value)}
			/>
			<TextField
				type='password'
				label='повторить пароль'
				placeholder='Введите Ваш пароль повторно'
				onChange={event => setRepeatPassword(event.target.value)}
			/>

			<TextField
				label='email'
				placeholder='Введите Ваш email'
				onChange={event => setEmail(event.target.value)}
			/>
			<Button
				onClick={event => {
					BackToLoginPage()
					handleSubmit(event)
				}}
				color='secondary'
				sx={{ mb: 0.5 }}
			>
				Создать аккаунт
			</Button>
		</Box>
	)
}

export default RegisterPage
