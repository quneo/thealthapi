// FormInput.tsx
import React, { FC } from 'react'
import { Controller } from 'react-hook-form'
import { TextField } from '@mui/material'
import { ModeConfigItem } from '../pages/auth/login/interfaces'
import styles from '../pages/auth/login/LoginPage.module.scss'

interface Props {
	config: ModeConfigItem
	control: any
	error?: string
	type?: string
}

export const FormInput: FC<Props> = ({
	config,
	control,
	error,
	type = 'text',
}) => (
	<Controller
		name={config.name}
		control={control}
		render={({ field: { onChange, onBlur, value, ref } }) => (
			<TextField
				className={styles.MyTextField}
				label={config.label}
				placeholder={config.placeholder}
				error={!!error}
				helperText={error}
				type={type}
				onChange={onChange}
				onBlur={onBlur}
				value={value}
				inputRef={ref}
			/>
		)}
	/>
)
