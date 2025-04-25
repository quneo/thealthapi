import React, {FC, JSX, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box} from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { IPropsLogin } from '../../../common/types/auth';
import { instance } from '../../../utils/Axios';


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
	);
};

export default LoginPage;
