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
		secondary: {
			main: '#C0C0C0', // серебристый основной цвет
			light: '#D3D3D3',
			dark: '#A9A9A9',
			contrastText: '#000',
		},
		info: {
			// новый стиль с черным цветом
			main: '#000000',
			light: '#333333',
			dark: '#000000',
			contrastText: '#ffffff',
		},
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
				root: {
					width: '100%',
					fontFamily:
						"'Montserrat', 'Roboto', 'Helvetica', 'Arial', sans-serif",
					marginBottom: '1rem',
				},
			},
			defaultProps: { variant: 'contained' },
		},
		MuiTextField: {
			styleOverrides: {
				root: {
					width: '100%',
					fontFamily:
						"'Montserrat', 'Roboto', 'Helvetica', 'Arial', sans-serif",
					marginBottom: '1rem',
				},
			},
			defaultProps: { variant: 'outlined', size: 'small' },
		},
		MuiInputLabel: {
			styleOverrides: {
				root: {
					fontFamily:
						"'Montserrat', 'Roboto', 'Helvetica', 'Arial', sans-serif",
					'&.MuiFormLabel-colorSecondary': {
						color: '#ccc',
					},
					'&.MuiFormLabel-colorSecondary.Mui-focused': {
						color: '#eee',
					},
					'&.MuiFormLabel-colorSecondary.MuiInputLabel-shrink': {
						color: '#eee',
					},
				},
			},
		},
		MuiInputBase: {
			styleOverrides: {
				input: {
					fontFamily:
						"'Montserrat', 'Roboto', 'Helvetica', 'Arial', sans-serif",
				},
			},
		},
		MuiFormHelperText: {
			styleOverrides: {
				root: {
					fontFamily:
						"'Montserrat', 'Roboto', 'Helvetica', 'Arial', sans-serif",
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: ({ ownerState }) => ({
					...(ownerState.color === 'secondary' && {
						color: '#eee',
						backgroundColor: 'transparent',
						'& .MuiOutlinedInput-notchedOutline': {
							borderWidth: 2,
							borderStyle: 'solid',
							borderColor: 'transparent',
							borderImageSlice: 1,
							borderImageSource: `linear-gradient(
                135deg,
                rgb(192, 192, 192) 0%,
                rgb(211, 211, 211) 25%,
                rgb(169, 169, 169) 50%,
                rgb(192, 192, 192) 75%,
                rgb(220, 220, 220) 100%
              )`,
						},
						'&:hover .MuiOutlinedInput-notchedOutline': {
							borderImageSource: `linear-gradient(135deg, rgb(220,220,220), rgb(192,192,192))`,
						},
						'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
							borderImageSource: `linear-gradient(135deg, rgb(255,255,255), rgb(192,192,192))`,
						},
						'& input::placeholder': {
							color: '#bbb',
							opacity: 1,
						},
					}),
				}),
			},
		},
	},
})

export const AppThemeProvider = ({ children }: { children: ReactNode }) => (
	<ThemeProvider theme={theme}>{children}</ThemeProvider>
)
