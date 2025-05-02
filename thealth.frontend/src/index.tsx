import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { AppThemeProvider } from './theme'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<title>THealth</title>
			<AppThemeProvider>
				<App />
			</AppThemeProvider>
		</BrowserRouter>
	</React.StrictMode>
)
