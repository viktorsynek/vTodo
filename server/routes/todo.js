const express = require("express");
const {
	getTodos,
	getTodo,
	updateTodo,
	createTodo,
	deleteTodo,
} = require("../controllers/todos");
const { protect } = require("../middleware/auth");
const router = express.Router();

router.route("/").get(protect, getTodos).post(protect, createTodo);
router.route("/:id").get(protect, getTodo).put(protect, updateTodo).delete(protect, deleteTodo);

module.exports = router;
