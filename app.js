const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const UserModel = require('./model/model');

const MONGO_PASSWORD = 'Swsd2001';
const uri = `mongodb+srv://swsd2544:${MONGO_PASSWORD}@node-jwt-passport.zacgw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose.connect(uri);
mongoose.connection.on('error', (error) => console.log(error));
mongoose.Promise = global.Promise;

require('./auth/auth');

const routes = require('./routes/routes');
const secureRoutes = require('./routes/secure_routes');

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use('/', routes);

app.use(
	'/user',
	passport.authenticate('jwt', { session: false }),
	secureRoutes
);

app.use(function (err, req, res, next) {
	res.statue(err.status || 500);
	res.json({ error: err });
});

app.listen(3000, () => {
	console.log('The server started on port 3000');
});
