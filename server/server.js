const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const todos = require('./routes/todo');
const logger = require('./middleware/logger');
const connectDB = require('./config/db');

dotenv.config({path: './config/config.env'});

connectDB();

const app = express();

app.use('/api/todos', todos);
app.use(logger);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} in ${process.env.NODE_ENV} mode.`.cyan.bold);
})