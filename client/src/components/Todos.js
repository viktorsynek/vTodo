import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faTrash,
	faPen,
	faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

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
	}, []);

	const fetchTodos = async () => {
		const response = await fetch("http://localhost:5000/api/todos/", {
			method: "GET",
			headers: {
				Authorization: localStorage.getItem("token"),
				"Content-Type": "application/json",
			},
		});
		const data = await response.json();
		console.log(data);
		setTodos(data.data);
		if (!data.sucess) {
			console.log(data.message);
		}
	};

	const searchTodo = async (e) => {
		e.preventDefault();
		const search = document.getElementById("search").value;
		console.log(`searching todo named: ${search}`);
	};

	const createTodo = async (e) => {
		e.preventDefault();
		window.location.href = "/create-todo";
	};

	return (
		<>
			<Navbar></Navbar>
			<div className="box">
				<div className="search-box">
					<button onClick={createTodo} id="add">
						Add Task
					</button>
					<input
						id="search"
						type="text"
						name="search"
						placeholder="Search by title . . ."
					/>
					<button onClick={searchTodo} id="search-btn">
						<FontAwesomeIcon icon={faMagnifyingGlass} />
					</button>
				</div>
				<div className="todos">
					{todos.map((todo) => (
						<div key={todo._id} className="todo">
							<div>
								<input type="checkbox" name="check" />
							</div>
							<div className="left">
								<h3>{todo.title}</h3>
								<p>{new Date(todo.date).toLocaleString()}</p>
							</div>
							<div className="right">
								<button>
									<FontAwesomeIcon icon={faPen} />
								</button>
								<button>
									<FontAwesomeIcon icon={faTrash} />
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default Todos;
