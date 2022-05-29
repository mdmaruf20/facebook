const mongoose = require('mongoose')

const dbConnect = () => {
	const DB_URL = 'mongodb+srv://326040Maruf:326040Maruf@cluster0.0wztu.mongodb.net/facebook_test';
	// database connection
	mongoose.connect(DB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});

	const db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connnection error...'));
	db.on('open', () => {
		console.log('DB Connected...');
	});
}

module.exports = dbConnect;