const checkUser = require('../middleware/loginmiddleware');

const router = require('express').Router();

router
	.use(checkUser)
	.route('/')
	.get((req, res) => {
		res.json({
			message: 'dummy route',
		});
	});

module.exports = router;
