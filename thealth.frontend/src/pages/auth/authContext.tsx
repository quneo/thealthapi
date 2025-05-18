import React, { createContext, useContext, useEffect, useState } from 'react'

interface User {
	username: string
	avatarUrl: string
}

interface AuthContextType {
	user: User | null
	token: string | null
	login: (token: string, user: User) => void
	logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [token, setToken] = useState<string | null>(null)
	const [user, setUser] = useState<User | null>(null)

	useEffect(() => {
		const savedToken = localStorage.getItem('jwtToken')
		const savedUser = localStorage.getItem('user')
		if (savedToken && savedUser) {
			setToken(savedToken)
			setUser(JSON.parse(savedUser))
		}
	}, [])

	const login = (jwtToken: string, userData: User) => {
		setToken(jwtToken)
		setUser(userData)
		localStorage.setItem('jwtToken', jwtToken)
		localStorage.setItem('user', JSON.stringify(userData))
	}

	const logout = () => {
		setToken(null)
		setUser(null)
		localStorage.removeItem('jwtToken')
		localStorage.removeItem('user')
	}

	return (
		<AuthContext.Provider value={{ user, token, login, logout }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	const context = useContext(AuthContext)
	if (!context) throw new Error('useAuth must be used within AuthProvider')
	return context
}
