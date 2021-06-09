const jwt = require('jsonwebtoken');

const checkUser = (req, res, next) => {
	const token = req.headers.authorization;

	console.log({ token }, 'token');
	if (token) {
		jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
			if (err) {
				res.json({
					success: false,
					err,
				});
				next();
			} else {
				console.log({ decodedToken });
				next();
			}
		});
	} else {
		res.json({
			success: false,
			err: 'Invalid Token',
		});
	}
};

module.exports = checkUser;
