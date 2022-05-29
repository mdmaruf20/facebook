const express = require('express');
const path = require('path');
const routes = require('./routes');
const bodyParser = require("body-parser");
const dbConnect = require('./database');
const cookieParser = require('cookie-parser');

const app = express();

// passport config
// const passportInit = require('./config/passport');
// passportInit(passport);
// app.use(passport.initialize());
// app.use(passport.session());

dbConnect();

app.use(cookieParser());

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '/public')));

app.use(routes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is Running on PORT ${PORT}`)
})