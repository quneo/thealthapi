import Grid from '@mui/material/Grid'
import CreatePostBar from '../../components/CreatePostBar'
import { Box } from '@mui/material'

export default function ProfilePage() {
	return (
		<Box sx={{ overflowX: 'hidden' }}>
			<Grid
				container
				spacing={10}
				sx={{
					maxWidth: 1200,
					mx: 'auto',
					justifyContent: 'center',
					mt: 15.5,
				}}
			>
				<Grid size={{ md: 8 }}>
					<CreatePostBar />
				</Grid>
				<Grid size={{ md: 4 }}></Grid>
			</Grid>
		</Box>
	)
}
