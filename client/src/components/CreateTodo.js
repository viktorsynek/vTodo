import Navbar from "./Navbar";
import ErrorMessage from "./ErrorMessage";
import { useState } from "react";
import { Link } from "react-router-dom";

const CreateTodo = () => {
	const [errorMsg, setErrorMsg] = useState("");

	const createTodo = async (e) => {
		e.preventDefault();
		const title = document.getElementById("todo-title").value;
		const desc = document.getElementById("desc").value;
		const response = await fetch("http://localhost:5000/api/todos", {
			method: "POST",
			headers: {
				Authorization: localStorage.getItem("token"),
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ title, description: desc }),
		});
		const data = await response.json();
		if (data.success) {
			window.location.href = "/todos";
		} else {
			setErrorMsg(data.message);
		}
	};

	return (
		<>
			<Navbar></Navbar>
			{errorMsg && <ErrorMessage errorMsg={errorMsg} />}
			<div className="create">
				<h1>Create New Todo</h1>
				<p>Title</p>
				<input type="text" name="title" id="todo-title" />
				<br />
				<p>Description</p>
				<textarea name="desc" id="desc" cols="30" rows="13"></textarea>
				<br />
				<button onClick={createTodo}>Create Todo</button>
				<Link to="/todos">Go Back Home</Link>
			</div>
		</>
	);
};

export default CreateTodo;
