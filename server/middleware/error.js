const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
	let error = { ...err };
	let message = err.message;

	console.error(err);

	if (err.name === "CastError") {
		message = `Resource not found`;
		error = new ErrorResponse(message, 404);
	}

	if (err.code === 11000) {
		message = "Duplicate field value entered";
		error = new ErrorResponse(message, 400);
	}

	if (err.name === "ValidationError") {
		message = Object.values(err.errors).map((val) => val.message);
		error = new ErrorResponse(message, 400);
	}

	res.status(error.statusCode || 500).json({
		success: false,
		error: message || "Server Error",
	});
};

module.exports = errorHandler;
