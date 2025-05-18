import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { AuthData, Mode } from './interfaces'
import { getSchema } from './validation'

export const useLoginForm = (mode: Mode) => {
	return useForm<AuthData>({
		resolver: yupResolver(getSchema(mode)),
		mode: 'onChange',
		defaultValues: {
			username: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	})
}
