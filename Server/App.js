const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/signUp' , require('./SignUp'));
app.use('/api/signIn' , require('./SignIn'));
app.use('/api/execution' , require('./execution'));
module.exports = app;