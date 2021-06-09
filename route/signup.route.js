const router = require('express').Router();
const bcrypt = require('bcrypt');
const SignUpController = require('../controller/signupcontroller');
const LoginController = require('../controller/logincontroller');
const checkUser = require('../middleware/loginmiddleware');

router
	.route('/signup')
	.get(SignUpController.signup_get)
	.post(SignUpController.signup_post);

router.route('/login').post(LoginController.login_post);

router.get('/dummy', checkUser, async (req, res) => {
	res.json({
		message: 'User login',
	});
});

module.exports = router;
