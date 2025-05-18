import React, { FC, useState, useEffect, useMemo, JSX } from 'react'
import { useLocation } from 'react-router-dom'
import styles from './AuthRoot.module.scss'
import { Box } from '@mui/material'
import LoginPage from './auth/login/LoginPage'
import RegisterPage from './auth/register/RegisterPage'
import SideBar from '../components/SideBar'
import { useAuth } from './auth/authContext'
import FeedPage from './feed/FeedPage'
import SettingsPage from './settings/SettingsPage'
import ProfilePage from './profile/ProfilePage'

const AuthRootComponent: FC = (): JSX.Element => {
	const [isOpen, setIsOpen] = useState(true)
	const [backgroundImage, setBackgroundImage] = useState('')
	const location = useLocation()

	const { user } = useAuth()

	const backgroundImages = useMemo(
		() => [
			'/img/background.jpg',
			'/img/background2.jpg',
			'/img/background3.jpg',
			'/img/background4.jpg',
			'/img/background5.jpg',
			'/img/background6.jpg',
			'/img/background7.jpg',
		],
		[]
	)

	useEffect(() => {
		const randomIndex = Math.floor(Math.random() * backgroundImages.length)
		setBackgroundImage(backgroundImages[randomIndex])
	}, [backgroundImages])

	const handleBackgroundChange = (bg: string) => {
		setBackgroundImage(bg)
	}

	const showSideBar = [
		'/profile',
		'/feed',
		'/messenger',
		'/friends',
		'/notes',
		'/workouts',
		'/schedule',
		'/statistics',
		'/settings',
	].includes(location.pathname)

	return (
		<Box
			className={styles.root}
			sx={{
				width: '100%',
				height: '100vh',
				backgroundImage: `url(${backgroundImage})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
				transition: 'background-image 0.3s ease',
				display: 'flex',
			}}
		>
			{location.pathname === '/login' && <LoginPage />}
			{location.pathname === '/register' && <RegisterPage />}
			{showSideBar && (
				<>
					<SideBar
						drawerWidth={225}
						isOpen={isOpen}
						setIsOpen={setIsOpen}
						userName={user?.username || 'Пользователь'}
						userAvatarUrl={user?.avatarUrl || '/img/profilePhoto.jpg'}
					/>
					<Box
						sx={{
							flex: 1,
							p: 3,
						}}
					>
						{location.pathname === '/profile' && <ProfilePage />}
						{location.pathname === '/feed' && <FeedPage />}
						{location.pathname === '/messenger' && <FeedPage />}
						{location.pathname === '/friends' && <FeedPage />}
						{location.pathname === '/notes' && <FeedPage />}
						{location.pathname === '/schedule' && <FeedPage />}
						{location.pathname === '/workouts' && <FeedPage />}
						{location.pathname === '/statistics' && <FeedPage />}
						{location.pathname === '/settings' && (
							<SettingsPage onBackgroundChange={handleBackgroundChange} />
						)}
					</Box>
				</>
			)}
		</Box>
	)
}

export default AuthRootComponent
