import React, { FC } from 'react'
import { Box } from '@mui/material'
import MyButton from './MyButton'
import { Mode } from '../pages/auth/interfaces'

interface Props {
	mode: Mode
	setMode: (mode: Mode) => void
}

export const ModeSwitcher: FC<Props> = ({ mode, setMode }) => (
	<Box sx={{ display: 'flex', gap: 0.5 }}>
		<MyButton
			variant={mode === 'login' ? 'contained' : 'outlined'}
			onClick={() => setMode('login')}
		>
			Логин
		</MyButton>
		<MyButton
			variant={mode === 'email' ? 'contained' : 'outlined'}
			onClick={() => setMode('email')}
		>
			Email
		</MyButton>
	</Box>
)
