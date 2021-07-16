import React, { ChangeEvent, useState } from 'react';
import {
	Container,
	Card,
	CardContent,
	TextField,
	FormControl,
	InputLabel,
	OutlinedInput,
	InputAdornment,
	IconButton,
	Typography,
	Button,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useStylesQuiz } from '../styles/quizstyles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
	const register = {
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
		showPassword: false,
		showError: false,
		error: '',
	};

	const navigate = useNavigate();

	const classes = useStylesQuiz();

	const [registerField, setRegisterField] = useState(register);

	const registerForm = (e: ChangeEvent<HTMLInputElement>) => {
		setRegisterField({ ...registerField, [e.target.id]: e.target.value });
	};

	const handleMouseOverShowPassword = () => {
		setRegisterField({ ...registerField, showPassword: true });
	};

	const handleMouseLeaveHidePassword = () => {
		setRegisterField({ ...registerField, showPassword: false });
	};

	const passwordChecker = (): boolean => {
		if (registerField.password) {
			if (registerField.confirmPassword) {
				if (registerField.password === registerField.confirmPassword) {
					return true;
				}
			}
		}
		return false;
	};

	const submitRegister = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (passwordChecker()) {
			const { data } = await axios.post('http://localhost:3000/signup', {
				email:
					registerField.email !== undefined && registerField.email.length > 0
						? registerField.email
						: undefined,
				username:
					registerField.username !== undefined &&
					registerField.username.length > 0
						? registerField.username
						: undefined,

				password:
					registerField.password !== undefined &&
					registerField.password.length > 0
						? registerField.password
						: undefined,
			});

			if (data.success) {
				setRegisterField({ ...registerField, showError: false, error: '' });
				navigate('/login');
			} else {
				console.log(data, 'data');
				if (data.err.email.length > 0) {
					setRegisterField({
						...registerField,
						error: data.err.email,
						showError: true,
					});
				} else if (data.err.password.length > 0) {
					setRegisterField({
						...registerField,
						error: data.err.password,
						showError: true,
					});
				} else if (data.err.username.length > 0) {
					setRegisterField({
						...registerField,
						error: data.err.username,
						showError: true,
					});
				}
			}
		} else {
			setRegisterField({
				...registerField,
				error: 'Password and Confirm password are not same',
				showError: true,
			});
		}
	};
	return (
		<Container className={classes.container}>
			<Card className={classes.card}>
				<CardContent>
					<Typography variant='h4'>Register</Typography>
					<form noValidate autoComplete='off' onSubmit={submitRegister}>
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
							}}>
							<TextField
								required
								id='username'
								label='Username'
								variant='outlined'
								type='text'
								value={registerField.username}
								onChange={registerForm}
								style={{
									width: '25rem',
									marginBottom: '1.5rem',
									marginTop: '2rem',
								}}
							/>
							<TextField
								required
								id='email'
								label='Email'
								variant='outlined'
								type='email'
								value={registerField.email}
								onChange={registerForm}
								style={{
									width: '25rem',
									marginBottom: '1.5rem',
								}}
							/>
							<FormControl
								variant='outlined'
								required
								style={{
									width: '25rem',
									marginBottom: '1.5rem',
								}}>
								<InputLabel
									style={{ backgroundColor: 'white', paddingRight: '0.5rem' }}>
									Password
								</InputLabel>
								<OutlinedInput
									value={registerField.password}
									onChange={registerForm}
									id='password'
									type={registerField.showPassword ? 'text' : 'password'}
									endAdornment={
										<InputAdornment position='end'>
											<IconButton
												aria-label='toggle password visibility'
												onMouseEnter={handleMouseOverShowPassword}
												onMouseLeave={handleMouseLeaveHidePassword}
												edge='end'>
												{registerField.showPassword ? (
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
							<FormControl
								variant='outlined'
								required
								style={{
									width: '25rem',
									marginBottom: '1.5rem',
								}}>
								<InputLabel
									style={{ backgroundColor: 'white', paddingRight: '0.5rem' }}>
									Confirm Password
								</InputLabel>
								<OutlinedInput
									value={registerField.confirmPassword}
									onChange={registerForm}
									id='confirmPassword'
									type='password'
									labelWidth={100}
								/>
							</FormControl>
							{registerField.showError && (
								<Typography style={{ color: 'red', marginBottom: '0.8rem' }}>
									{registerField.error}
								</Typography>
							)}
							<Button variant='outlined' type='submit'>
								Register
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</Container>
	);
}

export default Register;
