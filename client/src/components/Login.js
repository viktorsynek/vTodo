import Navbar from './Navbar';
import '../css/reglog.css';
import {Link} from 'react-router-dom';
import React, { useEffect } from 'react';


const Login = () => {
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            window.location.href = '/todos';
        } 
    }, []);

    async function loginUser(e) {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: document.querySelector('input[type="text"]').value,
                password: document.querySelector('input[type="password"]').value
            })
        });

        const data = await response.json();
        if(data.token)
        {
            localStorage.setItem('token', data.token);
            window.location.href = '/todos';
        }
    }

    return ( 
    <>
        <Navbar></Navbar>
        <form onSubmit={loginUser} className="login reglog">
            <h1>Login</h1>
            <p>Username</p><input type="text" />
            <p>Password</p><input type="password" />
            <br />
            <input type="submit" value="Login" />
            <br />
            <Link to="/pw">Forgot Password?</Link>
        </form>
    </>
);
}
 
export default Login;