import { Route, Routes } from 'react-router-dom'
import AuthRootComponent from './pages/auth'

function App() {
	return (
		<div className='App'>
			<Routes>
				<Route path='register' element={<AuthRootComponent />} />
				<Route path='login' element={<AuthRootComponent />} />
			</Routes>
		</div>
	)
}

export default App
