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
		const Todos = await Todo.find({ user: userId });
		res.status(200).json({
			success: true,
			count: Todos.length,
			data: Todos,
		});
	} catch (err) {
		res.status(400).json({ sucess: false, error: err });
	}
};

exports.getTodo = async (req, res, next) => {
	try {
		const todo = await Todo.findById(req.params.id);
		if (!todo) {
			return res
				.status(404)
				.json({ success: false, message: "Todo not found" });
		}

		res.status(200).json({
			success: true,
			data: todo,
		});
	} catch (error) {
		console.error("Error getting todo:", error);
		res.status(500).json({ success: false, message: "Server error" });
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
		if (!req.body.title || !req.body.description) {
			return res.status(400).json({
				success: false,
				message: "Please provide title and description",
			});
		} else if (req.body.title.length < 3 || req.body.description.length < 3) {
			return res.status(400).json({
				success: false,
				message: "Title and description must be at least 3 characters long",
			});
		} else if (req.body.title.length > 30) {
			return res.status(400).json({
				success: false,
				message: "Title must be less than 30 characters long",
			});
		}
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
		const { id } = req.params;

		if (!id) {
			return res
				.status(400)
				.json({ success: false, message: "No todo ID provided" });
		}

		if (!req.body.title || !req.body.description) {
			return res.status(400).json({
				success: false,
				message: "Please provide title and description",
			});
		} else if (req.body.title.length < 3 || req.body.description.length < 3) {
			return res.status(400).json({
				success: false,
				message: "Title and description must be at least 3 characters long",
			});
		} else if (req.body.title.length > 30) {
			return res.status(400).json({
				success: false,
				message: "Title must be less than 30 characters long",
			});
		}

		const todo = await Todo.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		});

		if (!todo) {
			return res
				.status(404)
				.json({ success: false, message: "Todo not found" });
		}

		res.status(200).json({
			success: true,
			data: todo,
		});
	} catch (error) {
		console.error("Error updating todo:", error);
		res.status(500).json({ success: false, message: "Server error" });
	}
};

exports.deleteTodo = async (req, res, next) => {
	try {
		const token = req.headers.authorization;

		if (!token) {
			return res
				.status(401)
				.json({ success: false, error: "Unauthorized: No token provided" });
		}

		const todo = await Todo.findByIdAndDelete(req.params.id);

		if (!todo) {
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
