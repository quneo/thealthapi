import * as yup from 'yup'
import { LoginFormData, Mode, ModeConfigItem } from './interfaces'

export const modeConfig: Record<Mode, ModeConfigItem> = {
	login: {
		label: 'Логин',
		placeholder: 'Введите Ваш Логин',
		name: 'username',
		description: 'Введите логин, который привязан к аккаунту',
	},
	email: {
		label: 'Email',
		placeholder: 'Введите Ваш Email',
		name: 'email',
		description: 'Введите email, который привязан к аккаунту',
	},
	password: {
		label: 'Пароль',
		placeholder: 'Введите Ваш Пароль',
		name: 'password',
		description: 'Введите пароль, который привязан к аккаунту',
	},
}

export const getSchema = (mode: Mode): yup.ObjectSchema<LoginFormData> => {
	switch (mode) {
		case 'login':
			return yup.object({
				username: yup.string().required('Логин обязателен').min(3),
			}) as yup.ObjectSchema<LoginFormData>
		case 'email':
			return yup.object({
				email: yup
					.string()
					.email('Неверный email')
					.required('Email обязателен'),
			}) as yup.ObjectSchema<LoginFormData>
		case 'password':
			return yup.object({
				password: yup.string().required('Пароль обязателен').min(6),
			}) as yup.ObjectSchema<LoginFormData>
		default:
			return yup.object({}) as yup.ObjectSchema<LoginFormData>
	}
}
