import Navbar from './Navbar';
import '../css/reglog.css';
import {Link} from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import ErrorMessage from './ErrorMessage';

const Login = () => {
    const [errorMsg, setErrorMsg] = useState('');
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            window.location.href = '/todos';
        } 
    }, []);

    async function loginUser(e) {
        e.preventDefault();
        const username = e.target.querySelector('input[type="text"]').value;
        const password = e.target.querySelector('input[type="password"]').value;
        if (!username || !password) {
            setErrorMsg('Please provide a username and password');
            return;
        }
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        if(data.token)
        {
            localStorage.setItem('token', data.token);
            window.location.href = '/todos';
        } else {
            setErrorMsg(data.message);
        }
    }

    return ( 
    <>
        <Navbar></Navbar>
        {errorMsg && <ErrorMessage errorMsg={errorMsg} />}
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