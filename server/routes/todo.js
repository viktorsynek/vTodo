const express = require('express');
const {getTodos, getTodo, updateTodo, createTodo, deleteTodo} = require('../controllers/todos');
const router = express.Router();

router.route('/').get(getTodos).post(createTodo);
router.route('/:id').get(getTodo).put(updateTodo).delete(deleteTodo);

module.exports = router;