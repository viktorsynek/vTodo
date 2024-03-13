import Navbar from "./Navbar";
import ErrorMessage from "./ErrorMessage";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const UpdateTodo = () => {
	const { todoId } = useParams();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");
	const [todoData, setTodoData] = useState({
		title: "",
		description: "",
	});

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			window.location.href = "/login";
			return;
		}
		fetchTodoDetails();
		setIsLoggedIn(true);
	}, [isLoggedIn, todoId]);

	const fetchTodoDetails = async () => {
		try {
			const response = await fetch(
				`http://localhost:5000/api/todos/${todoId}`,
				{
					method: "GET",
					headers: {
						Authorization: localStorage.getItem("token"),
						"Content-Type": "application/json",
					},
				}
			);
			const data = await response.json();
			if (response.ok) {
				setTodoData({
					title: data.data.title,
					description: data.data.description,
				});
			} else {
				setErrorMsg(data.error);
			}
		} catch (error) {
			console.error("Error fetching todo details:", error);
		}
	};

	const updateTodo = async (e) => {
		e.preventDefault();
		const title = document.getElementById("todo-title").value;
		const desc = document.getElementById("desc").value;
		const response = await fetch(`http://localhost:5000/api/todos/${todoId}`, {
			method: "PUT",
			headers: {
				Authorization: localStorage.getItem("token"),
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ title, description: desc }),
		});
		const data = await response.json();
		console.log(data);
		if (data.success) {
			window.location.href = "/todos";
		} else {
			setErrorMsg(data.error);
		}
	};

	return (
		<>
			<Navbar></Navbar>
			{errorMsg && <ErrorMessage errorMsg={errorMsg} />}
			<div className="update">
				<h1>Update Todo</h1>
				<p>Title</p>
				<input
					type="text"
					name="title"
					id="todo-title"
					value={todoData.title}
					onChange={(e) => setTodoData({ ...todoData, title: e.target.value })}
				/>
				<br />
				<textarea
					name="desc"
					id="desc"
					cols="30"
					rows="13"
					value={todoData.description}
					onChange={(e) =>
						setTodoData({ ...todoData, description: e.target.value })
					}
				></textarea>
				<br />
				<button onClick={updateTodo}>Update Todo</button>
				<Link to="/todos">Go Back Home</Link>
			</div>
		</>
	);
};

export default UpdateTodo;
