import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthRootComponent from './components/auth';

function App() {
	return (
		<div className='App'>
			<Routes>
				<Route path='register' element={<AuthRootComponent />} />
				<Route path='login' element={<AuthRootComponent />} />
			</Routes>
		</div>
	);
};

export default App;
