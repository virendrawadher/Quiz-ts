import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import PlayingQuiz from './pages/playquiz';
import Home from './pages/home';
import Login from './pages/login';
import Layout from './components/layout';
import PrivateRoute from './privateroute/privateroute';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import axios from 'axios';
import Rules from './components/rules';
import { useQuiz } from './reducer/quiz-reducer';
import Register from './pages/register';

const theme = createMuiTheme({
	palette: {
		primary: {
			light: '#F3F4F6',
			main: '#34D399',
		},
		secondary: {
			light: '#F9FAFB',
			main: '#f77f00',
		},
	},
	typography: {
		fontFamily: 'Playfair Display, serif;',
		fontWeightRegular: 400,
		fontWeightMedium: 500,
	},
});

function App() {
	const [isUserLogin, setIsUserLogIn] = useState(true);

	const { state, dispatch } = useQuiz();
	


	useEffect(() => {
		(async function(){
			try {
				const data = await axios.get('http://localhost:3000/quiz/title')
				if(data.status === 200){
					if(data.data.success){
						dispatch({type: 'TITLE', payload: data.data.title})
					}else{
						console.log(data.data.err)
					}
				}
				
			} catch (error) {
				console.log(error)
			}
		})()
	}, [])
	return (
		<div className='App'>
			<ThemeProvider theme={theme}>
				<Layout>
					<Routes>
						<Route path='/' element={<Home />} />
						{state.showRules ? (
							<Route path='/quiz/:id/rules' element={<Rules />} />
						) : (
							<PrivateRoute
								path='/quiz/:id'
								element={<PlayingQuiz />}
								isUserLogin={isUserLogin}
							/>
						)}
						<Route path='/login' element={<Login />} />
						<Route path='/register' element={<Register />} />
					</Routes>
				</Layout>
			</ThemeProvider>
		</div>
	);
}

export default App;
