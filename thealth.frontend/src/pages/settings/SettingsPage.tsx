import { Box, Typography, Button, Stack, TextField } from '@mui/material'
import { useState, FC } from 'react'

interface SettingsPageProps {
	onBackgroundChange: (bg: string) => void
}

const backgrounds = [
	{ label: 'Светлый', value: '#f4f6fa' },
	{ label: 'Серый', value: '#e0e0e0' },
	{
		label: 'Градиент',
		value: 'linear-gradient(120deg, #f6eaff 0%, #eaf3ff 100%)',
	},
	{
		label: 'Фото',
		value:
			'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80)',
	},
]

const SettingsPage: FC<SettingsPageProps> = ({ onBackgroundChange }) => {
	const [custom, setCustom] = useState('')

	return (
		<Box>
			<Typography variant='h5' mb={2}>
				Настройки
			</Typography>
			<Typography mb={1}>Выберите фон:</Typography>
			<Stack direction='row' spacing={2} mb={2}>
				{backgrounds.map(bg => (
					<Button
						key={bg.label}
						variant='outlined'
						onClick={() => onBackgroundChange(bg.value)}
						sx={{
							minWidth: 80,
							bgcolor: bg.value.includes('#') ? bg.value : undefined,
						}}
					>
						{bg.label}
					</Button>
				))}
			</Stack>
			<Typography mb={1}>Или введите свой CSS:</Typography>
			<Stack direction='row' spacing={2}>
				<TextField
					size='small'
					placeholder='например, #fff или url(...)'
					value={custom}
					onChange={e => setCustom(e.target.value)}
				/>
				<Button variant='contained' onClick={() => onBackgroundChange(custom)}>
					Применить
				</Button>
			</Stack>
		</Box>
	)
}

export default SettingsPage
