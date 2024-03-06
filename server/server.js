const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const todos = require("./routes/auth");
const auth = require("./routes/auth");
const logger = require("./middleware/logger");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();
app.use(cors());
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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use("/api/todos", todos);
app.use("/api/auth", auth);
app.use(logger);

const PORT = process.env.PORT;

app.listen(PORT, () => {
	console.log(
		`Server is running on ${PORT} in ${process.env.NODE_ENV} mode.`.cyan.bold
	);
});
