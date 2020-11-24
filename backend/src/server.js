const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const bodyparser = require('body-parser');
const cookies = require('cookie-parser');
const app = express();

require('./dbonfig/dbconfig');

app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}));
app.use(express.json());
app.use(bodyparser.json());
app.use(cookies("secretmyboy"))

app.use(session({
secret:"my super secrete very secret",
resave:true,
saveUninitialized:true
}));

app.use(passport.initialize());
app.use(passport.session());
require('./passportconfig/passport')(passport);


app.use('/user', require('./routes/user'));

app.listen (3001, console.log("beep beep server living"));