const jwt = require('jsonwebtoken');

const errorHandler = (err) => {
	console.log(err.message, err.code);
	let errors = { email: '', password: '' };

	if (err.message == 'SignUp validation failed: email: Please enter a email') {
		errors.email = 'Please enter a email';
		return errors;
	}

	if (err.message === 'Enter valid email address') {
		errors.email = err.message;
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

	return errors;
};

const createToken = (id) => {
	return jwt.sign({ id }, process.env.SECRET, {
		expiresIn: '24h',
	});
};

module.exports = { createToken, errorHandler };
