import React, { useEffect, useState } from 'react'
import axios from 'axios'

import './styles/styles.css'
import LoginForm from './components/login_form/LoginForm'
import Navbar from './components/navbar/Navbar'
import Header from './components/header/Header'
import ProfileWindow from './components/profile_window/ProfileWindow'
import MainPage from './pages/main_page/MainPage'
import LoginPage from './pages/login_page/LoginPage'
import SignUpPage from './pages/sign_up_page/SignUpPage'
// import APIExmp from "./components/api_exmp_component/APIExmp";
// import ExmpCard from "./components/exmp_card/ExmpCard";

function App() {
	return (
		<div className='App'>
			<MainPage />
			<LoginPage />
			<SignUpPage />
		</div>
	)
}

export default App
