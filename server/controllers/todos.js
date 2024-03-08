const Todo = require("../models/Todo");
const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");

exports.getTodos = async (req, res, next) => {
	const token = req.headers.authorization;
	if (!token) {
		return next(new ErrorResponse("Unauthorized: No token provided", 401));
	}

	const decoded = jwt.verify(token, process.env.JWT_SECRET);
	const userId = decoded.id;
	const Todos = await Todo.find({ user: userId });
	res.status(200).json({
		success: true,
		count: Todos.length,
		data: Todos,
	});
};

exports.getTodo = async (req, res, next) => {
	const todo = await Todo.findById(req.params.id);
	if (!todo) {
		return next(new ErrorResponse("Todo not found", 404));
	}

	res.status(200).json({
		success: true,
		data: todo,
	});
};

exports.createTodo = async (req, res, next) => {
	const token = req.headers.authorization;
	if (!token) {
		return next(new ErrorResponse("Unauthorized: No token provided", 401));
	}

	const decoded = jwt.verify(token, process.env.JWT_SECRET);
	const userId = decoded.id;

	req.body.user = userId;
	if (!req.body.title || !req.body.description) {
		return next(new ErrorResponse("Please provide title and description", 400));
	} else if (req.body.title.length < 3 || req.body.description.length < 3) {
		return next(new ErrorResponse("Title and description must be at least 3 characters long", 400));
	} else if (req.body.title.length > 30) {
		return next(new ErrorResponse("Title must be less than 30 characters long", 400));
	}

	const todo = await Todo.create(req.body);
	res.status(201).json({
		success: true,
		data: todo,
	});
};

exports.updateTodo = async (req, res, next) => {
	const { id } = req.params;
	if (!id) {
		return next(new ErrorResponse("No todo ID provided", 400));
	}

	if (!req.body.title || !req.body.description) {
		return next(new ErrorResponse("Please provide title and description", 400));
	} else if (req.body.title.length < 3 || req.body.description.length < 3) {
		return next(new ErrorResponse("Title and description must be at least 3 characters long", 400));
	} else if (req.body.title.length > 30) {
		return next(new ErrorResponse("Title must be less than 30 characters long", 400));
	}

	const todo = await Todo.findByIdAndUpdate(id, req.body, {
		new: true,
		runValidators: true,
	});
	if (!todo) {
		return next(new ErrorResponse("Todo not found", 404));
	}

	res.status(200).json({
		success: true,
		data: todo,
	});
};

exports.deleteTodo = async (req, res, next) => {
	const token = req.headers.authorization;

	if (!token) {
		return next(new ErrorResponse("Unauthorized: No token provided", 401));
	}

	const todo = await Todo.findByIdAndDelete(req.params.id);
	if (!todo) {
		return next(new ErrorResponse("Todo not found", 404));
	}
	
	res.status(200).json({
		success: true,
		data: {},
	});
};
