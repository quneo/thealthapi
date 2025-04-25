export interface IPropsLogin {
  login: string
	password: string
	setPassword: (value: string) => void
	setLogin: (value: string) => void
	setEmail: (value: string) => void
}

export interface IPropsRegister {
  login: string
	password: string
	repeatPassword: string
	email: string
	setLogin: (value: string) => void
	setEmail: (value: string) => void
	setPassword: (value: string) => void
	setRepeatPassword: (value: string) => void
}