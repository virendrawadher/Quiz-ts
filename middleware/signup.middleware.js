const jwt = require('jsonwebtoken');

const errorHandler = (err) => {
	console.log(err.message, err.code);
	let errors = { email: '', password: '', username: '' };

	// console.log(err.errors.email.path, 'path');
	if (err.message == 'SignUp validation failed: email: Please enter a email') {
		console.log(err.errors, 'message');
		errors.email = 'Email field should not be empty';
		return errors;
	}
	if (err.message == 'SignUp validation failed: email: Enter valid email') {
		errors.email = 'Please enter valid email address';
		return errors;
	}

	if (
		err.message ==
		'SignUp validation failed: username: Username should not blank'
	) {
		errors.username = 'Username should be not empty';
		return errors;
	}

	if (err.code === 11000) {
		errors.email = 'This email alrady exits';
		return errors;
	}

	if (err.message === 'data and salt arguments required') {
		errors.password = 'Please enter the password';
	}

	if (err.message === 'incorrect password') {
		errors.password = 'Please enter the correct password';
	}
	if (err.message === 'incorrect email') {
		errors.email = 'This email is not registered';
	}

	if (err == 'Password should be atleast 6 character') {
		errors.password = 'Password should be atleast 6 character';
	}

	if (err == 'Username or email or password should not be empty') {
		errors.email = 'Username or email or password should not be empty';
	}

	return errors;
};

const createToken = (id) => {
	return jwt.sign({ id }, process.env.SECRET, {
		expiresIn: '24h',
	});
};

module.exports = { createToken, errorHandler };
