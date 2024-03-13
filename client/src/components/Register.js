import Navbar from "./Navbar";
import "../css/reglog.css";
import ErrorMessage from "./ErrorMessage";
import React, { useEffect, useState } from "react";

const Register = () => {
	const [errorMsg, setErrorMsg] = useState("");

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			window.location.href = "/todos";
		}
	}, []);

	async function registerUser(e) {
		e.preventDefault();
		setErrorMsg("");
		const email = e.target.querySelector('input[type="email"]').value;
		const username = e.target.querySelector('input[type="text"]').value;
		const password = e.target.querySelector('input[type="password"]').value;
		const confirmPassword = e.target.querySelector(
			'input[name="confirmPassword"]'
		).value;

		if (!email || !username || !password || !confirmPassword) {
			setErrorMsg("Please fill in all fields");
			return;
		}
		if (password !== confirmPassword) {
			setErrorMsg("Passwords do not match");
			return;
		}

		const response = await fetch("http://localhost:5000/api/auth/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, email, password }),
		});

		const data = await response.json();
		console.log(data);
		if (data.token) {
			window.location.href = "/login";
			setErrorMsg("");
		} else {
			setErrorMsg(data.error);
		}
	}

	return (
		<>
			<Navbar></Navbar>
			{errorMsg && <ErrorMessage errorMsg={errorMsg} />}
			<form onSubmit={registerUser} className="register reglog">
				<h1>Register</h1>
				<p id="em">Email</p>
				<input type="email" />
				<p>Username</p>
				<input type="text" />
				<p>Password</p>
				<input type="password" />
				<p id="cp">Confirm Password</p>
				<input type="password" name="confirmPassword" />
				<br />
				<input type="submit" value="Register" />
			</form>
		</>
	);
};

export default Register;
