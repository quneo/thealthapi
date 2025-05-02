import { createTheme, ThemeProvider } from '@mui/material/styles'
import React, { ReactNode } from 'react'

const theme = createTheme({
	palette: {
		primary: {
			main: '#240935',
			light: '#4f3a5d',
			dark: '#190625',
			contrastText: '#fff',
		},
		secondary: { main: '#D3D3D3', light: '#dbdbdb', dark: '#939393' },
		info: { main: '#B3DDF2', light: '#c2e3f4', dark: '#7d9aa9' },
	},
	components: {
		MuiTypography: {
			styleOverrides: {
				root: {
					textAlign: 'center',
					fontFamily: 'Montserrat',
					marginBottom: '1rem',
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: { width: '100%', fontFamily: 'Montserrat', marginBottom: '1rem' },
			},
			defaultProps: { variant: 'contained' },
		},
		MuiTextField: {
			styleOverrides: {
				root: { width: '100%', fontFamily: 'Montserrat', marginBottom: '1rem' },
			},
			defaultProps: { variant: 'outlined', size: 'small' },
		},
	},
})

export const AppThemeProvider = ({ children }: { children: ReactNode }) => (
	<ThemeProvider theme={theme}>{children}</ThemeProvider>
)
