import { Box, Typography, Stack, Avatar, Button } from '@mui/material'

const suggestions = [
	{ name: 'Алиса Рева', avatar: 'https://i.pravatar.cc/100?img=5' },
	{ name: 'Слава Репов', avatar: 'https://i.pravatar.cc/100?img=6' },
	{ name: 'Иван Шевч', avatar: 'https://i.pravatar.cc/100?img=7' },
]

export default function Suggestions() {
	return (
		<Box
			sx={{
				mb: 3,
				bgcolor: 'rgba(255, 255, 255, 0.1)',
				borderRadius: 5,
				p: 2,
			}}
		>
			<Typography
				fontWeight={700}
				mb={1}
				sx={{
					textAlign: 'left',
					pl: 1,
					userSelect: 'none',
				}}
			>
				Вам могут быть интересны
			</Typography>
			<Stack spacing={1}>
				{suggestions.map((s, idx) => (
					<Stack key={idx} direction='row' alignItems='center' spacing={1}>
						<Avatar src={s.avatar} />
						<Typography flex={1}>{s.name}</Typography>
						<Button
							size='small'
							variant='contained'
							sx={{
								bgcolor: '#333333',
								color: '#fff',
								width: 125,
								borderRadius: 10,
								textTransform: 'none',
								'&:hover': {
									bgcolor: '#555555',
								},
							}}
						>
							Подписаться
						</Button>
					</Stack>
				))}
			</Stack>
		</Box>
	)
}
