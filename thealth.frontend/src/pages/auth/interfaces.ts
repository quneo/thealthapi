export type Mode = 'login' | 'email' | 'password' | 'confirmPassword'

export interface AuthData {
	username?: string
	email?: string
	password?: string
	confirmPassword?: string
}

export interface ModeConfigItem {
	label: string
	placeholder: string
	name: keyof AuthData
	description: string
}
