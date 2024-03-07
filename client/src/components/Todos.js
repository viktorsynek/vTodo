import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen, faEye } from "@fortawesome/free-solid-svg-icons";

const Todos = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			window.location.href = "/login";
			return;
		}
		fetchTodos();
		setIsLoggedIn(true);
	}, [isLoggedIn]);

	const fetchTodos = async () => {
		const response = await fetch("http://localhost:5000/api/todos/", {
			method: "GET",
			headers: {
				Authorization: localStorage.getItem("token"),
				"Content-Type": "application/json",
			},
		});
		const data = await response.json();
		setTodos(data.data);
		if (!data.success) {
			console.log(data.error);
		}
	};

	const createTodo = async (e) => {
		e.preventDefault();
		window.location.href = "/create-todo";
	};

	const deleteTodo = async (todoId) => {
		try {
			const response = await fetch(
				`http://localhost:5000/api/todos/${todoId}`,
				{
					method: "DELETE",
					headers: {
						Authorization: localStorage.getItem("token"),
						"Content-Type": "application/json",
					},
				}
			);
			if (response.ok) {
				fetchTodos();
			} else {
				console.error("Failed to delete todo");
			}
		} catch (error) {
			console.error("Error deleting todo:", error);
		}
	};

	const checkTodo = (todoId) => {
		window.location.href = `/todos/${todoId}`;
	};

	const updateTodo = (todoId) => {
		window.location.href = `/todos/update/${todoId}`;
	};

	return (
		<>
			<Navbar></Navbar>
			<div className="box">
				<div className="search-box">
					<button onClick={createTodo} id="add">
						Add Task
					</button>
				</div>
				<div className="todos">
					{todos.length === 0 ? (
						<p id="none">No todos available {":("}</p>
					) : (
						todos.map((todo) => (
							<div key={todo._id} className="todo">
								<div>
									<input type="checkbox" name="check" />
								</div>
								<div className="left">
									<h3>{todo.title}</h3>
									<p>{new Date(todo.date).toLocaleString()}</p>
								</div>
								<div className="right">
									<button onClick={() => checkTodo(todo._id)}>
										<FontAwesomeIcon icon={faEye} />
									</button>
									<button onClick={() => updateTodo(todo._id)}>
										<FontAwesomeIcon icon={faPen} />
									</button>
									<button onClick={() => deleteTodo(todo._id)}>
										<FontAwesomeIcon icon={faTrash} />
									</button>
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</>
	);
};

export default Todos;
