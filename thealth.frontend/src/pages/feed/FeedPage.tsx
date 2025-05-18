import Grid from '@mui/material/Grid'
import Feed from '../../components/Feed'
import Stories from '../../components/Stories'
import Suggestions from '../../components/Suggestions'
import Recommendations from '../../components/Recommendations'
import CreatePostBar from '../../components/CreatePostBar'
import FeedHeader from '../../components/FeedHeader'
import { Box } from '@mui/material'

export default function FeedPage() {
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
					<FeedHeader />
					<CreatePostBar />
					<Feed />
				</Grid>
				<Grid size={{ md: 4 }}>
					<Stories />
					<Suggestions />
					<Recommendations />
				</Grid>
			</Grid>
		</Box>
	)
}
