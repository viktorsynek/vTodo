import Navbar from "./Navbar";

const CreateTodo = () => {
	const createTodo = async (e) => {
		e.preventDefault();
		// const title = document.getElementById('title').value;
		// const desc = document.getElementById('desc').value;
		// const token = localStorage.getItem('token');
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
