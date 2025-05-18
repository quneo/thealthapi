import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import styles from './RegisterPage.module.scss'
import { GoogleMultiColorIcon } from '../../../components/GoogleMultiColorIcon'
import GoogleButton from '../../../components/GoogleButton'
import { SubmitHandler } from 'react-hook-form'
import { instance } from '../../../utils/Axios'
import MyButton from '../../../components/MyButton'
import { FormInput } from '../../../components/FormInput'
import { modeConfig } from '../config'
import { AuthData, Mode } from '../interfaces'
import { useLoginForm } from '../useLoginForm'
import { useState } from 'react'

const RegisterPage = () => {
	const [mode] = useState<Mode>('login')
	const {
		control,
		handleSubmit,
		formState: { errors, isDirty, isValid },
	} = useLoginForm(mode)

	const submit: SubmitHandler<AuthData> = async data => {
		const { confirmPassword, ...dataToSend } = data
		try {
			await instance.post('/api/userlist/', dataToSend)
		} catch (error) {
			console.error('Ошибка при отправке формы:', error)
		}
	}

	const navigate = useNavigate()
	const backToLoginPage = useCallback(() => {
		navigate('/login')
	}, [navigate])

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLSpanElement>) => {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault()
				backToLoginPage()
			}
		},
		[backToLoginPage]
	)

	return (
		<Box
			className={styles.root}
			sx={{
				width: '100%',
				height: '100vh',
				backgroundImage: `url(${'/img/backgroundRegister2.png'})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
			}}
		>
			<Box sx={{ backdropFilter: 'blur(3px)' }} className={styles.container}>
				<Typography className={styles.logotype} variant='h5'>
					THealth
				</Typography>
				<Typography className={styles.subtitle} variant='h4'>
					Приступим!
				</Typography>
				<GoogleButton
					color='secondary'
					className={styles.googleButton}
					fullWidth
					startIcon={<GoogleMultiColorIcon />}
					variant='contained'
				>
					Войти с помощью Google
				</GoogleButton>

				<Box sx={{ width: 420, margin: 'auto', marginBottom: 11 }}>
					<Box sx={{ marginBottom: 2.5, marginTop: -2.5 }}>
						<div className={styles.lineTextLine}>
							<div className={styles.line}></div>
							<span className={styles.text}>или</span>
							<div className={styles.line}></div>
						</div>
					</Box>
					<form onSubmit={handleSubmit(submit)}>
						<FormInput
							config={modeConfig.login}
							control={control}
							error={errors.username?.message}
							color='secondary'
						/>
						<FormInput
							config={modeConfig.email}
							control={control}
							error={errors.email?.message}
							color='secondary'
						/>
						<FormInput
							config={modeConfig.password}
							control={control}
							error={errors.password?.message}
							type='password'
							color='secondary'
						/>
						<FormInput
							config={modeConfig.confirmPassword}
							control={control}
							error={errors.confirmPassword?.message}
							type='password'
							color='secondary'
						/>
						<MyButton
							type='submit'
							disabled={!isDirty || !isValid}
							color='secondary'
							fullWidth
						>
							Создать аккаунт
						</MyButton>
					</form>
				</Box>
				<Typography className={styles.text} variant='body2'>
					Уже есть аккаунт?{' '}
					<span
						className={styles.linkText}
						style={{
							color: 'purple',
							cursor: 'pointer',
						}}
						onMouseEnter={e => (e.currentTarget.style.color = '#311b92')}
						onMouseLeave={e => (e.currentTarget.style.color = 'purple')}
						onClick={backToLoginPage}
						role='link'
						onKeyDown={handleKeyDown}
					>
						Войти
					</span>
				</Typography>
			</Box>
		</Box>
	)
}

export default RegisterPage
