import Navbar from './Navbar';
import '../css/reglog.css';
import React, { useEffect } from 'react';

const Register = () => {
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            window.location.href = '/todos';
        } 
    }, []);

    async function registerUser(e) {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: document.querySelector('input[type="text"]').value,
                email: document.querySelector('input[type="email"]').value,
                password: document.querySelector('input[type="password"]').value
            })
        });

        const data = await response.json();

        if(data.user)
        {
            window.location.href = '/login';
        }
    }

    return ( 
        <>
            <Navbar></Navbar>
            <form onSubmit={registerUser} className="register reglog">
                <h1>Register</h1>
                <p id='em'>Email</p><input type="email" />
                <p>Username</p><input type="text" />
                <p>Password</p><input type="password" />
                <p id='cp'>Confirm Password</p><input type="password" />
                <br />
                <input type="submit" value="Register" />
            </form>
        </>
    );
}
 
export default Register;