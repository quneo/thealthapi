import React, { FC, useEffect, useState } from 'react'
import {
	Box,
	Drawer,
	List,
	ListItemText,
	ListItemButton,
	ListItemIcon,
	Typography,
	useTheme,
	Tooltip,
	Avatar,
} from '@mui/material'
import {
	ChevronLeft,
	ChevronRight,
	Article,
	Person,
	Chat,
	PeopleOutline,
	EditNote,
	CalendarMonth,
	FitnessCenter,
	Settings,
	BarChart,
} from '@mui/icons-material'
import { useLocation, useNavigate } from 'react-router-dom'

interface SideBarProps {
	drawerWidth: number
	isOpen: boolean
	setIsOpen: (open: boolean) => void
	userName: string
	userAvatarUrl: string
}

const menuItems = [
	{ label: 'Профиль', icon: <Person />, path: '/profile' },
	{ label: 'Лента', icon: <Article />, path: '/feed' },
	{ label: 'Мессенджер', icon: <Chat />, path: '/messenger' },
	{ label: 'Друзья', icon: <PeopleOutline />, path: '/friends' },
	{ label: 'Заметки', icon: <EditNote />, path: '/notes' },
	{ label: 'Расписание', icon: <CalendarMonth />, path: '/schedule' },
	{ label: 'Тренировки', icon: <FitnessCenter />, path: '/workouts' },
	{ label: 'Статистика', icon: <BarChart />, path: '/statistics' },
	{ label: 'Настройки', icon: <Settings />, path: '/settings' },
]

const SideBar: FC<SideBarProps> = ({
	drawerWidth,
	isOpen,
	setIsOpen,
	userName,
	userAvatarUrl,
}) => {
	const theme = useTheme()
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const [active, setActive] = useState(pathname)

	useEffect(() => {
		setActive(pathname)
	}, [pathname])

	const toggleDrawer = () => {
		setIsOpen(!isOpen)
	}

	return (
		<>
			<Drawer
				variant='permanent'
				open={isOpen}
				sx={{
					width: isOpen ? drawerWidth : 72,
					flexShrink: 0,
					'& .MuiDrawer-paper': {
						width: isOpen ? drawerWidth : 72,
						boxSizing: 'border-box',
						backgroundColor: 'rgba(255, 255, 255, 0.1)',
						color: theme.palette.secondary.main,
						overflowX: 'hidden',
						transition: theme.transitions.create('width', {
							easing: theme.transitions.easing.sharp,
							duration: theme.transitions.duration.enteringScreen,
						}),
						position: 'relative',
						boxShadow: 'none',
						height: '100vh',
					},
				}}
			>
				{/* Верхняя часть с аватаром и именем */}
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						flexDirection: 'column',
						py: 2,
						borderBottom: `1px solid ${theme.palette.divider}`,
						gap: 1,
					}}
				>
					<Avatar
						src={userAvatarUrl}
						alt={userName}
						sx={{
							width: isOpen ? 84 : 40,
							height: isOpen ? 84 : 40,
							cursor: 'pointer',
							transition: 'width 0.3s ease, height 0.3s ease',
						}}
						onClick={() => navigate('/profile')}
					/>
					{isOpen && (
						<Typography variant='subtitle1' noWrap sx={{ fontWeight: 600 }}>
							{userName}
						</Typography>
					)}
				</Box>

				{/* Меню */}
				<List sx={{ mt: 0.1 }}>
					{menuItems.map(({ label, icon, path }) => {
						const selected = active === path
						return (
							<ListItemButton
								key={label}
								selected={selected}
								onClick={() => navigate(path)}
								sx={{
									display: 'flex',
									alignItems: 'center',
									py: isOpen ? 0 : 1,
									mb: 1.5,
									px: isOpen ? 1.5 : 1.5,
									justifyContent: isOpen ? 'initial' : 'center',
									color: selected
										? theme.palette.info.main
										: theme.palette.secondary.main,
									bgcolor: 'transparent',
									'&:hover': {
										bgcolor: theme.palette.secondary.light,
										color: theme.palette.info.main,
										borderLeftColor: theme.palette.secondary.main,
									},
									borderRadius: 2,
									transition: 'all 0.3s',
								}}
							>
								<Tooltip title={isOpen ? '' : label} placement='right'>
									<ListItemIcon
										sx={{
											minWidth: 40,
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											color: 'inherit',
										}}
									>
										{icon}
									</ListItemIcon>
								</Tooltip>
								{isOpen && (
									<ListItemText
										primary={label}
										slotProps={{
											primary: {
												sx: {
													fontWeight: selected ? 700 : 'normal',
													fontFamily: "'Montserrat', sans-serif",
													span: { lineHeight: 1, display: 'block' },
													margin: 0,
												},
											},
										}}
									/>
								)}
							</ListItemButton>
						)
					})}
				</List>
			</Drawer>
			<Box
				sx={{
					position: 'fixed',
					top: '170px',
					left: isOpen ? drawerWidth - 8 : 60,
					transform: 'translateY(-50%)',
					bgcolor: 'background.paper',
					borderRadius: '50%',
					boxShadow: 2,
					zIndex: theme => theme.zIndex.drawer + 1,
					width: 20,
					height: 20,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					cursor: 'pointer',
					transition: 'left 0.3s ease',
				}}
				onClick={toggleDrawer}
			>
				{isOpen ? <ChevronLeft /> : <ChevronRight />}
			</Box>
		</>
	)
}

export default SideBar
