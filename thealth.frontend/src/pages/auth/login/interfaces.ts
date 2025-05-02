export type Mode = 'login' | 'email' | 'password'

export interface LoginFormData {
	username?: string
	email?: string
	password?: string
}

export interface ModeConfigItem {
	label: string
	placeholder: string
	name: keyof LoginFormData
	description: string
}
