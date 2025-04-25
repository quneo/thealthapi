import React, {FC, JSX, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, createTheme, ThemeProvider, Box} from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { IPropsLogin } from '../../../common/types/auth';
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


type Mode = 'login' | 'email' | 'password'

const LoginPage: FC<IPropsLogin> = (props: IPropsLogin): JSX.Element => {
	
	const {login, password, setPassword, setEmail, setLogin} = props
	const [isFirstClick, setIsFirstClick] = useState(true);
	const [mode, setMode] = useState<Mode>('login')
	const navigate = useNavigate();


	const handleModeChange = (newMode: Mode) => {
		setMode(newMode)
	}

  const handleSubmit = async(event: { preventDefault: () => void;}) => {
		event.preventDefault()
    if (isFirstClick) {
      setMode('password');
      setIsFirstClick(false);
    } else {
      // Второе нажатие - отправляем данные
      if (mode === 'password') {
        if (!setPassword) {
          
        } else {
         {const userData = {
							username: login,
							password: password
						}
						const user = await instance.post('/api/token/', userData)
						console.log(user.data)
					}
        }
      }
    }
  };

	const handleCreateAccount = () => {
		navigate('/register')
	}

	return (
		    <ThemeProvider theme={theme}>
					<Box>
					{mode === 'password' && (
					<>
						<KeyboardBackspaceIcon sx={{cursor: 'pointer'}} onClick={() => {setMode('login'); setIsFirstClick(true)}} aria-label="Назад"/>
					</>
				)}

						<Typography variant='h5' >Вход THealth </Typography>

					{mode === 'login' && (
					<>
  				<Typography>Введите логин, который <br /> привязан к аккаунту</Typography>
					
					<Box sx={{ display: "flex", gap: 0.5}}>
					
					<Button onClick={() => handleModeChange('login')}>Логин</Button>
					<Button variant='outlined' onClick={() => handleModeChange('email')}>Email</Button>
					
					</Box>

					<TextField label="Логин" placeholder="Введите Ваш Логин" 
					onChange={(event) => setLogin(event.target.value)}/>
					
					</>)}
					
					{mode === 'email' && (
					<>
					<Typography>Введите email, который <br /> привязан к аккаунту</Typography>
					
					<Box sx={{ display: "flex", gap: 0.5}} >
					
					<Button variant='outlined' onClick={() => handleModeChange('login')}>Логин</Button>
					<Button onClick={() => handleModeChange('email')}>Email</Button>
					
					</Box>
					
					<TextField label="Email" placeholder="Введите Ваш Email"  
					onChange={(event) => setEmail(event.target.value)}/>
					
					</>
					)}

					{mode === 'password' && (
					<>


					<Typography>Введите пароль, который <br /> привязан к аккаунту</Typography>
					<TextField type="password" label="Пароль" placeholder="Введите Ваш Пароль"  
					onChange={(event) => setPassword(event.target.value)}/>
					
					</>
					)}

					<Button onClick={handleSubmit} type="submit" color='secondary' sx={{mb:0.5}}>Войти</Button>
					<Button type="submit" onClick={handleCreateAccount} >Создать аккаунт</Button>
			</Box>	
	    </ThemeProvider>
	);
};

export default LoginPage;
