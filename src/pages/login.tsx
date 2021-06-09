import {
	Button,
	Card,
	CardContent,
	Container,
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	TextField,
	Theme,
	Typography,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import React, { ChangeEvent, useState } from 'react';
import { useStylesQuiz } from '../styles/quizstyles';
import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import { useQuiz } from '../reducer/quiz-reducer';

const useStyles = makeStyles((theme: Theme) => {
	return {
		textField: {
			width: '25rem',
			marginBottom: '1.5rem',
		},
	};
});

function Login() {
	const classes = useStylesQuiz();

	const classess = useStyles();

	const { state, dispatch } = useQuiz();

	const [loginCredential, setLoginCredential] = useState({
		email: '',
		password: '',
		showPassword: false,
		showError: false,
		error: '',
	});

	const emailPasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setLoginCredential({ ...loginCredential, [e.target.id]: e.target.value });
	};

	const handleMouseOverShowPassword = () => {
		setLoginCredential({
			...loginCredential,
			showPassword: true,
		});
	};

	const handleMouseLeaveHidePassword = () => {
		setLoginCredential({
			...loginCredential,
			showPassword: false,
		});
	};

	const loginForm = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const { data } = await axios.post('http://localhost:3000/login', {
				email: loginCredential.email,
				password: loginCredential.password,
			});

			if (data.success) {
				dispatch({ type: 'SET_TOKEN', payload: data.login.token });
				setLoginCredential({ ...loginCredential, showError: false, error: '' });
			}
		} catch (error) {
			setLoginCredential({
				...loginCredential,
				showError: true,
				error:
					error.response.data.err.email || error.response.data.err.password,
			});
			dispatch({ type: 'RESET' });
		}
	};

	console.log(state.token, 'token');

	console.log({ loginCredential });
	return (
		<div>
			<Container className={classes.container}>
				<Card className={classes.card}>
					<CardContent>
						<Typography variant='h4'>Login</Typography>
						<form noValidate autoComplete='off' onSubmit={loginForm}>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
								}}>
								<TextField
									required
									id='email'
									label='Email'
									variant='outlined'
									type='email'
									value={loginCredential.email}
									className={classess.textField}
									style={{ marginTop: '2rem' }}
									onChange={emailPasswordHandler}
								/>
								<FormControl
									variant='outlined'
									className={classess.textField}
									required>
									<InputLabel htmlFor='outlined-adornment-password'>
										Password
									</InputLabel>
									<OutlinedInput
										value={loginCredential.password}
										onChange={emailPasswordHandler}
										id='password'
										type={loginCredential.showPassword ? 'text' : 'password'}
										endAdornment={
											<InputAdornment position='end'>
												<IconButton
													aria-label='toggle password visibility'
													onMouseEnter={handleMouseOverShowPassword}
													onMouseLeave={handleMouseLeaveHidePassword}
													edge='end'>
													{loginCredential.showPassword ? (
														<Visibility />
													) : (
														<VisibilityOff />
													)}
												</IconButton>
											</InputAdornment>
										}
										labelWidth={70}
									/>
								</FormControl>
								{loginCredential.showError && (
									<Typography style={{ color: 'red', marginBottom: '0.8rem' }}>
										{loginCredential.error}
									</Typography>
								)}

								<Button variant='outlined' type='submit'>
									Log in
								</Button>

								<Typography style={{ marginTop: '1rem' }}>
									New user ?{' '}
									<Link
										to='/register'
										style={{ textDecoration: 'none', color: 'inherit' }}>
										Register
									</Link>
								</Typography>
							</div>
						</form>
					</CardContent>
				</Card>
			</Container>
		</div>
	);
}

export default Login;
