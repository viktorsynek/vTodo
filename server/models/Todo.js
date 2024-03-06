const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, "Please fill out the title of the todo."],
		maxlength: [100, "Title can not be more than 50 characters"],
	},
	description: {
		type: String,
		required: [true, "Please fill out the description of the todo."],
	},
	date: {
		type: Date,
		default: Date.now,
	},
	user: {
		type: mongoose.Schema.ObjectId,
		ref: "users",
		required: true,
	},
});

module.exports = mongoose.model("todos", TodoSchema);
