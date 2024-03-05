const Todo = require("../models/Todo");

exports.getTodos = async (req, res, next) => {
	try {
		const Todo = await Todo.find();

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
	req.body.user = req.user.id;
	try {
		const Todo = await Todo.create(req.body);

		res.status(201).json({
			success: true,
			data: Todo,
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
