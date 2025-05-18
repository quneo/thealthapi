import { Route, Routes } from 'react-router-dom'
import AuthRootComponent from './pages/AuthRoot'

function App() {
	return (
		<div className='App'>
			<Routes>
				<Route path='register' element={<AuthRootComponent />} />
				<Route path='login' element={<AuthRootComponent />} />
				<Route path='profile' element={<AuthRootComponent />} />
				<Route path='feed' element={<AuthRootComponent />} />
				<Route path='messenger' element={<AuthRootComponent />} />
				<Route path='friends' element={<AuthRootComponent />} />
				<Route path='notes' element={<AuthRootComponent />} />
				<Route path='schedule' element={<AuthRootComponent />} />
				<Route path='workouts' element={<AuthRootComponent />} />
				<Route path='statistics' element={<AuthRootComponent />} />
				<Route path='settings' element={<AuthRootComponent />} />
			</Routes>
		</div>
	)
}

export default App
