import { styled } from '@mui/material/styles'
import { Button } from '@mui/material'

const MyButton = styled(Button)(({ theme }) => ({
	color: theme.palette.primary.contrastText,
	padding: theme.spacing(1),
	borderRadius: 8,
	marginBottom: '16px',
	fullWidth: true,
	'&:hover': {
		backgroundColor: theme.palette.primary.dark,
	},
}))

export default MyButton
