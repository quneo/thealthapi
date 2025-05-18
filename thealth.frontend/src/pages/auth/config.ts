import { Mode, ModeConfigItem } from './interfaces'

export const modeConfig: Record<Mode, ModeConfigItem> = {
	login: {
		label: 'Логин',
		placeholder: 'Введите Логин',
		name: 'username',
		description: 'Введите логин, который привязан к аккаунту',
	},
	email: {
		label: 'Email',
		placeholder: 'Введите mail',
		name: 'email',
		description: 'Введите email, который привязан к аккаунту',
	},
	password: {
		label: 'Пароль',
		placeholder: 'Введите Пароль',
		name: 'password',
		description: 'Введите пароль, который привязан к аккаунту',
	},
	confirmPassword: {
		label: 'Повторите пароль',
		placeholder: 'Повторите пароль',
		name: 'confirmPassword',
		description: 'Повторите пароль',
	},
}
