import React, { FC, useState, useEffect, useMemo, JSX } from 'react';
import {useLocation } from 'react-router-dom';
import LoginPage from './login';
import RegisterPage from './register';
import './style.scss';
import {Box, createTheme, ThemeProvider} from '@mui/material';

const theme = createTheme({
	palette: {
		primary: { main: '#240935', light:  '#4f3a5d', dark: '#190625', contrastText: "#fff", },
		secondary: { main: '#D3D3D3', light:  '#dbdbdb', dark: '#939393', },
		info: { main: '#B3DDF2', light:  '#c2e3f4', dark: '#7d9aa9', },
	},
	components: {
		MuiTypography: {styleOverrides: {
				root: {textAlign: 'center', fontFamily: 'Montserrat', marginBottom: '0.5rem'},
			},
				defaultProps: {variant: 'body2'},
		},
		MuiButton: {styleOverrides: {
				root: {width: '100%', marginBottom: '1rem'},
			},
				defaultProps: {variant: 'contained'},
		},
		MuiTextField: { styleOverrides: {
				root: {marginBottom: '1rem', width: '100%'},
			},
				defaultProps: {variant: 'outlined', size: 'small', type: 'text'},
		},
	},

})


const AuthRootComponent: FC = (): JSX.Element => {
	const [email, setEmail] = useState('')
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const [repeatPassword, setRepeatPassword] = useState('')
	const [firstName, setFirstName] = useState('')
	const [secondName, setSecondName] = useState('')
	const [backgroundImage, setBackgroundImage] = useState('');
	const location = useLocation()

	const backgroundImages = useMemo(() => [
  '/img/background.jpg',
  '/img/background2.jpg',
  '/img/background3.jpg',
	'/img/background4.jpg',
	], []);

	  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    setBackgroundImage(backgroundImages[randomIndex]);
  }, [backgroundImages]);

	return (
		<Box className='root'
				sx={{
    				width: '100%',
    				height: '100vh',
    				backgroundImage: `url(${backgroundImage})`,
    				backgroundSize: 'cover',
    				backgroundPosition: 'center',
    				backgroundRepeat: 'no-repeat',
  					}}
>
				<form className='form'>
					<Box
						sx={{backgroundColor: 'rgba(237, 231, 225, 0.75)'}}
						display='flex'
						justifyContent='flex-start'
						alignItems='center'
						flexDirection='column'
						width={225}
						height={250}
						maxWidth={640}
						margin='auto'
						padding={5}
						borderRadius={5}
						boxShadow={'5px 5px 10px #ccc'}
					>
					<ThemeProvider theme={theme}>
					{location.pathname === '/login' 
					? <LoginPage login={login} password={password} setLogin={setLogin} setPassword={setPassword} setEmail={setEmail}/> 
					: location.pathname === '/register' 
					? <RegisterPage email={email} login={login} password={password} repeatPassword={repeatPassword} setLogin={setLogin} setPassword={setPassword} setRepeatPassword={setRepeatPassword} setEmail={setEmail}/> 
					: null}
					</ThemeProvider>
					</Box>
				</form>
		</Box>
	)
}

export default AuthRootComponent;
