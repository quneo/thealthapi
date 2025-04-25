import React, { FC, JSX, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IPropsRegister } from '../../../common/types/auth';
import { ThemeProvider,createTheme,TextField, Button, Typography, Box } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { instance } from '../../../utils/Axios';

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



const RegisterPage: FC<IPropsRegister> = (props: IPropsRegister): JSX.Element => {
	const {email, login, password, setEmail, setLogin, setPassword, setRepeatPassword} = props
	const navigate = useNavigate();

	const BackToLoginPage = () => {
		navigate('/login')
	}

		const handleSubmit = async(event: { preventDefault: () => void;}) => {
			event.preventDefault()
					if (!setPassword) {
						
					} 
					if (!setLogin) {
						
					} 
					else {
					 {const userData = {
								username: login,
								password: password,
								email: email
							}
							const user = await instance.post('/api/userlist/', userData)
							console.log(user.data)
						}
					}
		};

	return (
		    <ThemeProvider theme={theme}>
				<Box>
					<KeyboardBackspaceIcon sx={{cursor: 'pointer'}} onClick={BackToLoginPage} aria-label="Назад"/>
					<Typography variant='h6' >Создание аккаунта</Typography>
				
					<Typography noWrap>Ваш логин будет использоваться <br /> для входа в аккаунт</Typography>
					<TextField label="логин" placeholder="Введите Ваш логин" onChange={(event) => setLogin(event.target.value)}/>

					<TextField type='password' label="пароль" placeholder="Введите Ваш пароль" onChange={(event) => setPassword(event.target.value)}/>
					<TextField type='password' label="повторить пароль" placeholder="Введите Ваш пароль повторно" onChange={(event) => setRepeatPassword(event.target.value)}/>

					<TextField label="email" placeholder="Введите Ваш email" onChange={(event) => setEmail(event.target.value)}/>
				<Button onClick={(event) => {BackToLoginPage(); handleSubmit(event)}} color='secondary' sx={{mb:0.5}}>Создать аккаунт</Button>
				
				</Box>
				</ThemeProvider>
	);
};

export default RegisterPage;
