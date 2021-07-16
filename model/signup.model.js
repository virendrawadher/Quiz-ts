const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const signupSchema = new Schema({
	username: {
		type: String,
		required: [true, 'Username should not blank'],
	},
	email: {
		type: String,
		required: [true, 'Please enter a email'],
		unique: true,
		validate: [/.+\@.+\..+/, 'Enter valid email'],
		lowercase: true,
	},
	password: {
		type: String,
		required: [true, 'Please Enter password'],
		minLength: 6,
	},
});

signupSchema.statics.login = async function (email, password) {
	const signupUser = await this.findOne({ email });

	if (signupUser) {
		const passwordChecker = await bcrypt.compare(password, signupUser.password);

		if (passwordChecker) {
			return signupUser;
		}
		throw Error('incorrect password');
	}
	throw Error('incorrect email');
};

const SignUp = mongoose.model('SignUp', signupSchema);

module.exports = { SignUp };
