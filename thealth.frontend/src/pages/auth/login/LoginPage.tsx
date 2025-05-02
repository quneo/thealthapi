import React, { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography, Box } from '@mui/material'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { instance } from '../../../utils/Axios'
import { SubmitHandler } from 'react-hook-form'
import styles from './LoginPage.module.scss'
import { LoginFormData, Mode } from './interfaces'
import { useLoginForm } from './useLoginForm'
import { modeConfig } from './config'
import { ModeSwitcher } from '../../../components/ModeSwitcher'
import { FormInput } from '../../../components/FormInput'
import MyButton from '../../../components/MyButton'

const LoginPage: FC = () => {
	const [mode, setMode] = useState<Mode>('login')
	const { control, handleSubmit, formState, watch, reset } = useLoginForm(mode)
	const { isDirty, isValid } = formState
	const loginValue = watch('username')
	const emailValue = watch('email')
	const currentConfig = modeConfig[mode]

	const navigate = useNavigate()
	const onContinue = () => setMode('password')
	const onBack = () => setMode('login')
	const onCreateAccount = () => navigate('/register')

	const submit: SubmitHandler<LoginFormData> = async (data: LoginFormData) => {
		try {
			await instance.post('/api/token/', data)
		} catch (error) {
			console.error('Ошибка при отправке формы:', error)
		}
	}

	useEffect(() => {
		if (mode === 'login' || mode === 'email') {
			reset({ username: '', email: '', password: '' })
		}
	}, [mode, reset])

	return (
		<Box className={styles.container}>
			<form onSubmit={handleSubmit(submit)}>
				{mode === 'password' && (
					<KeyboardBackspaceIcon
						className={styles.backIcon}
						onClick={onBack}
						aria-label='Назад'
					/>
				)}

				<Typography sx={{ mb: 2 }} className={styles.MyTypography} variant='h6'>
					Вход THealth{' '}
				</Typography>

				{(mode === 'login' || mode === 'email') && (
					<ModeSwitcher mode={mode} setMode={setMode} />
				)}

				<Typography className={styles.MyTypography} variant='body2'>
					{currentConfig.description}{' '}
					{mode === 'password' && (
						<>
							{' '}
							{loginValue && `${loginValue}`}
							{emailValue && `${emailValue}`}
						</>
					)}
				</Typography>

				<FormInput
					config={modeConfig[mode]}
					control={control}
					error={formState.errors[modeConfig[mode].name]?.message}
					type={mode === 'password' ? 'password' : 'text'}
				/>

				{mode !== 'password' ? (
					<MyButton
						sx={{ mb: 0.5 }}
						onClick={onContinue}
						disabled={!isDirty || !isValid}
						color='secondary'
					>
						Продолжить
					</MyButton>
				) : (
					<MyButton
						sx={{ mb: 0.5 }}
						type='submit'
						disabled={!isDirty || !isValid}
						color='secondary'
					>
						Войти
					</MyButton>
				)}

				<MyButton sx={{ mb: 0.5 }} onClick={onCreateAccount}>
					Создать аккаунт
				</MyButton>
			</form>
		</Box>
	)
}

export default LoginPage
