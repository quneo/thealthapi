import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoginFormData, Mode } from './interfaces'
import { getSchema } from './config'

export const useLoginForm = (mode: Mode) => {
	return useForm<LoginFormData>({
		resolver: yupResolver(getSchema(mode)),
		mode: 'onChange',
		defaultValues: { username: '', email: '', password: '' },
	})
}
