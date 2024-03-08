require("dotenv").config({ path: "./config/config.env" });
require("colors");

const express = require("express");
const todos = require("./routes/todo");
const auth = require("./routes/auth");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT;

connectDB();

app.use(cors());
app.use(logger);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, OPTIONS, PUT, PATCH, DELETE"
	);
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	next();
});
app.use("/api/todos", todos);
app.use("/api/auth", auth);
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(
		`Server is running on ${PORT} in ${process.env.NODE_ENV} mode.`.cyan.bold
	);
});