import "./css/main.css";
import "./css/todo.css";
import PageNotFound from "./components/404";
import Login from "./components/Login";
import Todos from "./components/Todos";
import Register from "./components/Register";
import ForgotPassword from "./components/Password";
import ResetPassword from "./components/ResetPassword";
import CreateTodo from "./components/CreateTodo";
import { Route, Routes, useNavigate } from "react-router-dom";
import React from "react";

function RedirectToRegister() {
	const navigate = useNavigate();

	React.useEffect(() => {
		navigate("/login");
	}, [navigate]);

	return null;
}

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<RedirectToRegister />}></Route>
				<Route path="*" element={<PageNotFound />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/forgotpassword" element={<ForgotPassword />} />
				<Route path="/resetpassword" element={<ResetPassword />} />
				<Route path="/todos" element={<Todos />} />
				<Route path="/create-todo" element={<CreateTodo />} />
			</Routes>
		</>
	);
}

export default App;
