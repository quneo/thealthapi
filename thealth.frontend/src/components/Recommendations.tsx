import { Box, Typography, Grid } from '@mui/material'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import HikingIcon from '@mui/icons-material/Terrain'
import DesignServicesIcon from '@mui/icons-material/DesignServices'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports'
import BrushIcon from '@mui/icons-material/Brush'

const recommendations = [
	{
		label: 'UI/UX',
		icon: <DesignServicesIcon sx={{ fontSize: 32, color: '#222' }} />,
		bgColor: 'rgba(230, 240, 250, 0.1)',
	},
	{
		label: 'Музыка',
		icon: <MusicNoteIcon sx={{ fontSize: 32, color: '#222' }} />,
		bgColor: 'rgba(255, 182, 193, 0.1)',
	},
	{
		label: 'Кулинария',
		icon: <RestaurantIcon sx={{ fontSize: 32, color: '#222' }} />,
		bgColor: 'rgba(238, 238, 238, 0.1)',
	},
	{
		label: 'Хайкинг',
		icon: <HikingIcon sx={{ fontSize: 32, color: '#222' }} />,
		bgColor: 'rgba(215, 191, 255, 0.1)',
	},
	{
		label: 'Гейминг',
		icon: <SportsEsportsIcon sx={{ fontSize: 32, color: '#222' }} />,
		bgColor: 'rgba(200, 230, 201, 0.1)',
	},
	{
		label: 'Искусство',
		icon: <BrushIcon sx={{ fontSize: 32, color: '#222' }} />,
		bgColor: 'rgba(255, 224, 178, 0.1)',
	},
]

export default function Recommendations() {
	return (
		<Box
			sx={{
				bgcolor: 'rgba(255,255,255,0.1)',
				borderRadius: 5,
				p: 2,
				maxWidth: 400,
				mx: 'auto',
			}}
		>
			<Typography fontWeight={700} mb={2} sx={{ textAlign: 'left', pl: 1 }}>
				Рекомендации
			</Typography>
			<Grid container spacing={2}>
				{recommendations.map(({ label, icon, bgColor }, idx) => (
					<Grid key={idx}>
						<Box
							sx={{
								width: 90,
								height: 90,
								mx: 'auto',
								mb: 1,
								background: bgColor,
								borderRadius: 15,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								backdropFilter: 'blur(45px)',
								boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)',
							}}
						>
							{icon}
							<Typography
								variant='subtitle2'
								fontWeight={700}
								sx={{ mt: 1, color: '#222' }}
							>
								{label}
							</Typography>
						</Box>
					</Grid>
				))}
			</Grid>
		</Box>
	)
}
