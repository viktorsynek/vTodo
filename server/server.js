const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const todos = require('./routes/auth');
const auth = require('./routes/auth');
const logger = require('./middleware/logger');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

dotenv.config({path: './config/config.env'});

connectDB();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/todos', todos);
app.use(cookieParser());
app.use('/api/auth', auth);
app.use(logger);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} in ${process.env.NODE_ENV} mode.`.cyan.bold);
})