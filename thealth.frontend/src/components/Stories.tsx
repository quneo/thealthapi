import { Box, Typography, Stack, Avatar } from '@mui/material'

const stories = [
	{
		user: 'Анатолий Прут',
		img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
	},
	{
		user: 'Лилия Рай',
		img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
	},
]

export default function Stories() {
	return (
		<Box
			sx={{
				justifyContent: 'flex-start',
				mb: 3,
				pl: 2,
				bgcolor: 'rgba(255, 255, 255, 0.1)',
				borderRadius: 2,
				p: 2,
				transition: 'background-color 0.3s ease',
				width: '100%',
				maxWidth: 600,
				boxSizing: 'border-box',
				overflow: 'hidden',
			}}
		>
			<Typography
				fontWeight={700}
				mb={2}
				sx={{
					textAlign: 'left',
					pl: 1,
					userSelect: 'none',
				}}
			>
				Истории
			</Typography>
			<Stack
				direction='row'
				spacing={2}
				justifyContent='flex-start'
				sx={{
					overflowX: 'auto',
					flexWrap: 'nowrap',
				}}
			>
				{stories.map((story, idx) => (
					<Box key={idx}>
						<Avatar
							src={story.img}
							variant='square'
							sx={{
								width: 100,
								height: 150,
								mb: 1,
								borderRadius: 4,
								border: '2px solid #e0e0e0',
								objectFit: 'cover',
							}}
						/>
						<Typography
							variant='caption'
							sx={{ color: 'text.primary', wordBreak: 'break-word' }}
						>
							{story.user}
						</Typography>
					</Box>
				))}
			</Stack>
		</Box>
	)
}
