const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const signupSchema = new Schema({
	username: {
		type: String,
		required: [true, 'Username cannot be blank'],
	},
	email: {
		type: String,
		required: [true, 'Please enter a email'],
		unique: true,
		validate: [/.+\@.+\..+/, 'Enter valid email address '],
		lowercase: true,
	},
	password: {
		type: String,
		required: [true, 'Please Enter password'],
		min: [6, 'Minimum password length is 6 character'],
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
