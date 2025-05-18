import { styled } from '@mui/material/styles'
import { Button, ButtonProps } from '@mui/material'
import React from 'react'

interface GoogleButtonProps extends ButtonProps {
	className?: string
}

const StyledButton = styled(Button)(({ theme }) => ({
	height: '45px',
	width: '400px',
	padding: theme.spacing(1),
	borderRadius: 5,
	fullWidth: true,
	'&:hover': {},
}))

const GoogleButton: React.FC<GoogleButtonProps> = ({ className, ...props }) => {
	return <StyledButton className={className} {...props} />
}

export default GoogleButton
