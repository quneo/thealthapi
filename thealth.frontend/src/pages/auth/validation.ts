import * as yup from 'yup'
import { AuthData, Mode } from './interfaces'

export const getSchema = (mode: Mode): yup.ObjectSchema<AuthData> => {
	switch (mode) {
		case 'login':
			return yup.object({
				username: yup.string().required('Логин обязателен').min(3),
			}) as yup.ObjectSchema<AuthData>
		case 'email':
			return yup.object({
				email: yup
					.string()
					.email('Неверный email')
					.required('Email обязателен'),
			}) as yup.ObjectSchema<AuthData>
		case 'password':
			return yup.object({
				password: yup.string().required('Пароль обязателен').min(6),
			}) as yup.ObjectSchema<AuthData>
		case 'confirmPassword':
			return yup.object({
				confirmPassword: yup
					.string()
					.required('Пароль должен совпадать')
					.min(6),
			}) as yup.ObjectSchema<AuthData>
		default:
			return yup.object({}) as yup.ObjectSchema<AuthData>
	}
}
