import Navbar from "./Navbar";
import ErrorMessage from "./ErrorMessage";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const CheckTodo = () => {
	const { todoId } = useParams();

	const [errorMsg, setErrorMsg] = useState("");
	const [todoData, setTodoData] = useState({
		title: "",
		description: "",
	});

	useEffect(() => {
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
					setErrorMsg(data.message);
				}
			} catch (error) {
				console.error("Error fetching todo details:", error);
			}
		};

		fetchTodoDetails();
	}, [todoId]);

	return (
		<>
			<Navbar></Navbar>
			{errorMsg && <ErrorMessage errorMsg={errorMsg} />}
			<div className="update">
				<h1>What a Beautiful Todo ✨</h1>
				<p>Title</p>
				<input
					type="text"
					name="title"
					id="todo-title"
					value={todoData.title}
					onChange={(e) => setTodoData({ ...todoData, title: e.target.value })}
					disabled
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
					readOnly
				></textarea>
				<br />
				<Link to="/todos">Go Back Home</Link>
			</div>
		</>
	);
};

export default CheckTodo;
