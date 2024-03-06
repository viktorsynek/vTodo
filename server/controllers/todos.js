const Todo = require("../models/Todo");
const jwt = require("jsonwebtoken");

exports.getTodos = async (req, res, next) => {
	try {
		const token = req.headers.authorization;
		if (!token) {
			return res
				.status(401)
				.json({ success: false, error: "Unauthorized: No token provided" });
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const userId = decoded.id;

		const Todo = await Todo.find({ user: userId });

		res.status(200).json({
			success: true,
			count: Todo.length,
			data: Todo,
		});
	} catch (error) {
		res.status(400).json({ sucess: false });
	}
};

exports.getTodo = async (req, res, next) => {
	try {
		const Todo = await Todo.findById(req.params.id);
		if (!bootcamp) {
			return res.status(400).json({ success: false });
		}
		res.status(200).json({
			success: true,
			data: Todo,
		});
	} catch (error) {
		res.status(400).json({ sucess: false });
	}
};

exports.createTodo = async (req, res, next) => {
	try {
		const token = req.headers.authorization;

		if (!token) {
			return res
				.status(401)
				.json({ success: false, error: "Unauthorized: No token provided" });
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const userId = decoded.id;

		req.body.user = userId;

		const todo = await Todo.create(req.body);

		res.status(201).json({
			success: true,
			data: todo,
		});
	} catch (error) {
		res.status(400).json({ sucess: false });
	}
};

exports.updateTodo = async (req, res, next) => {
	try {
		const Todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		if (!bootcamp) {
			return res.status(400).json({ success: false });
		}
		res.status(200).json({
			success: true,
			data: Todo,
		});
	} catch (error) {
		res.status(400).json({ sucess: false });
	}
};

exports.deleteTodo = async (req, res, next) => {
	try {
		const Todo = await Todo.findByIdAndDelete(req.params.id);

		if (!bootcamp) {
			return res.status(400).json({ success: false });
		}
		res.status(200).json({
			success: true,
			data: {},
		});
	} catch (error) {
		res.status(400).json({ sucess: false });
	}
};
