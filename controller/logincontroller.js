const { SignUp } = require('../model/signup.model');
const {
	errorHandler,
	createToken,
} = require('../middleware/signup.middleware');

module.exports.login_post = async (req, res) => {
	try {
		const { email, password } = req.body;

		const login = await SignUp.login(email, password);

		const token = createToken(login._id);

		// console.log({ token });

		res.json({
			success: true,
			login: {
				_id: login._id,
				username: login.username,
				email: login.email,
				token,
			},
		});
	} catch (error) {
		const err = errorHandler(error);
		res.status(404).json({
			success: false,
			err,
		});
	}
};
