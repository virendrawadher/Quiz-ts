const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const checkUser = require('./middleware/loginmiddleware');

const db_connect = require('./databaseConnect/database_Connect');
db_connect;
const Dummy = require('./model/dummy.model');
const dummyV1 = require('./route/dummy.route');
const signupRoute = require('./route/signup.route');

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());

const port = process.env.PORT;

console.log(port);

app.use('/dummy', dummyV1);
app.use(signupRoute);

app.post('/', async (req, res) => {
	const newData = req.body;
	// console.log()
	const saveData = await Dummy.insertMany(newData);
	res.json({
		success: true,
		newData,
	});
});

app.get('/', checkUser, (req, res) => {
	res.json({
		message: 'video library',
	});
});

app.listen(port, () => {
	console.log('server connected');
});
