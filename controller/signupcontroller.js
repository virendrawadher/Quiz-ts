const bcrypt = require('bcrypt');
const { SignUp } = require('../model/signup.model');
const { errorHandler } = require('../middleware/signup.middleware');
const { createToken } = require('../middleware/signup.middleware');
const { response } = require('express');

module.exports.signup_get = async (req, res) => {
	try {
		const signUp = await SignUp.find({});

		res.json({
			success: true,
			user: signUp,
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			err: error.message,
		});
	}
};

module.exports.signup_post = async (req, res) => {
	try {
		let { username, email, password } = req.body;
		console.log(req.body);
		if (username && email && password) {
			if (password.length >= 6) {
				const salt = await bcrypt.genSalt();
				password = await bcrypt.hash(password, salt);
				const newSignup = { username, email, password };

				const saveSignup = await SignUp.create(newSignup);

				res.status(201).json({
					success: true,
					user: {
						_id: saveSignup._id,
						email: saveSignup.email,
						username: saveSignup.username,
					},
				});
			} else {
				throw 'Password should be atleast 6 character';
			}
		} else {
			throw 'Username or email or password should not be empty';
		}
	} catch (error) {
		console.log(error, 'errors');
		const err = errorHandler(error);
		console.log(err, 'error');
		res.json({
			success: false,
			err,
		});
	}
};
