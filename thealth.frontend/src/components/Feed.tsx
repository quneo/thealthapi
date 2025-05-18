import {
	Card,
	CardContent,
	Avatar,
	Typography,
	CardMedia,
	Stack,
	Chip,
	Box,
} from '@mui/material'

const posts = [
	{
		id: 1,
		user: { name: 'Георгий Лобко', avatar: 'https://i.pravatar.cc/100?img=12' },
		text: 'Всем привет, сегодня я был на самой красивой горе в мире! 😍 Передаю привет @Света, @Оля и @Давид ',
		images: [
			'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
			'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
			'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80',
		],
		likes: 6355,
		comments: 128,
		label: 'Впечатления',
	},
	{
		id: 2,
		user: { name: 'Виталий Бойко', avatar: 'https://i.pravatar.cc/100?img=13' },
		text: 'Сегодня выбрал отличный кофе: латте с кокосовым молоком... очень вкусно!',
		images: [],
		likes: 155,
		comments: 12,
		label: 'Еда',
	},
]

export default function Feed() {
	return (
		<Box sx={{ width: '100%', overflow: 'visible' }}>
			<Stack spacing={3}>
				{posts.map(post => (
					<Card
						key={post.id}
						sx={{
							borderRadius: 3,
							bgcolor:
								post.id === 1
									? 'rgba(234, 243, 255, 0.1)'
									: 'rgba(255, 251, 230, 0.1)',
							backdropFilter: 'blur(45px)',
						}}
					>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								px: 2,
								pt: 2,
								pb: 1,
								gap: 1,
							}}
						>
							<Avatar src={post.user.avatar} />
							<Typography
								fontWeight={700}
								sx={{
									height: '10px',
									whiteSpace: 'normal',
									overflowWrap: 'break-word',
									wordBreak: 'break-word',
									maxWidth: 'calc(100% - 56px)',
								}}
							>
								{post.user.name}
							</Typography>
						</Box>
						<CardContent>
							<Typography sx={{ mb: 2, textAlign: 'left' }}>
								{post.text}
							</Typography>
							{post.images.length > 0 && (
								<Stack direction='row' spacing={2} sx={{ mb: 2 }}>
									{post.images.map((img, idx) => (
										<CardMedia
											key={idx}
											component='img'
											image={img}
											sx={{
												width: 190,
												height: 190,
												borderRadius: 2,
												objectFit: 'cover',
											}}
										/>
									))}
								</Stack>
							)}
							<Stack direction='row' spacing={2} alignItems='center'>
								<Typography variant='body2' color='text.secondary'>
									👍 {post.likes}
								</Typography>
								<Typography variant='body2' color='text.secondary'>
									💬 {post.comments}
								</Typography>
								<Chip label={post.label} size='small' color='info' />
							</Stack>
						</CardContent>
					</Card>
				))}
			</Stack>
		</Box>
	)
}
