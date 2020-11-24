const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const app = express();

require('./dbonfig/dbconfig');

app.use(cors());
app.use(express.json());


app.use('/user', require('./routes/user'));

app.listen (3001, console.log("beep beep server living"));