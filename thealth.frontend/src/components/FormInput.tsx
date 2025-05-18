import React, { FC } from 'react'
import { Controller } from 'react-hook-form'
import { TextField } from '@mui/material'
import { ModeConfigItem } from '../pages/auth/interfaces'

interface Props {
	config: ModeConfigItem
	control: any
	error?: string
	type?: string
	color?: 'primary' | 'secondary'
}

export const FormInput: FC<Props> = ({
	config,
	control,
	error,
	type = 'text',
	color = 'primary',
}) => (
	<Controller
		name={config.name}
		control={control}
		render={({ field: { onChange, onBlur, value, ref } }) => (
			<TextField
				color={color}
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
