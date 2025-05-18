import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { AppThemeProvider } from './theme'
import { AuthProvider } from './pages/auth/authContext'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<AppThemeProvider>
				<AuthProvider>
					<App />
				</AuthProvider>
			</AppThemeProvider>
		</BrowserRouter>
	</React.StrictMode>
)
