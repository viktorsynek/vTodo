import Navbar from "./Navbar";

const CreateTodo = () => {
	const createTodo = async (e) => {
		e.preventDefault();
		const title = document.getElementById("title").value;
		const desc = document.getElementById("desc").value;
		const response = await fetch("http://localhost:5000/api/todos", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title,
				desc,
			}),
		});
		const data = await response.json();
		if (data.success) {
			window.location.href = "/todos";
		} else {
			console.log(data.message);
		}
	};

	return (
		<>
			<Navbar></Navbar>
			<div className="create">
				<h1>Create New Todo</h1>
				<p>Title</p>
				<input type="text" name="title" id="title" />
				<br />
				<p>Description</p>
				<textarea name="desc" id="desc" cols="30" rows="15"></textarea>
				<br />
				<button onClick={createTodo}>Create Todo</button>
				<a href="/todos">Go Back Home</a>
			</div>
		</>
	);
};

export default CreateTodo;
