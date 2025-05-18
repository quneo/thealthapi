import React, { useState } from 'react'
import { Box, Typography, Tabs, Tab } from '@mui/material'

const FeedHeader = () => {
	const [tab, setTab] = useState(0)

	const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
		setTab(newValue)
	}

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'flex-start',
				gap: 38,
				width: '1100px',
			}}
		>
			<Typography
				variant='h6'
				sx={{
					fontWeight: 'bold',
					color: 'black',
				}}
			>
				Лента
			</Typography>
			<Tabs
				value={tab}
				onChange={handleTabChange}
				aria-label='feed tabs'
				sx={{
					flexDirection: 'row-reverse',
					'& .MuiTabs-indicator': {
						backgroundColor: theme => theme.palette.info.main,
					},
				}}
				textColor='inherit'
			>
				<Tab
					label='Рекомендованные'
					sx={{
						fontWeight: 'bold',
						fontSize: '0.75rem',
						color: theme => (tab === 1 ? theme.palette.info.main : 'inherit'),
					}}
				/>
				<Tab
					label='Друзья'
					sx={{
						fontWeight: 'bold',
						fontSize: '0.75rem',
						color: theme => (tab === 1 ? theme.palette.info.main : 'inherit'),
					}}
				/>
				<Tab
					label='Популярные'
					sx={{
						fontWeight: 'bold',
						fontSize: '0.75rem',
						color: theme => (tab === 1 ? theme.palette.info.main : 'inherit'),
					}}
				/>
			</Tabs>

			{tab === 0 && <Box></Box>}
			{tab === 1 && <Box></Box>}
			{tab === 2 && <Box></Box>}
			{tab === 3 && <Box></Box>}
		</Box>
	)
}

export default FeedHeader
