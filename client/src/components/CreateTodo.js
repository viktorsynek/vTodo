import React from "react";
import Navbar from "./Navbar";
import React, { useState, useEffect } from 'react';

const CreateTodo = () => {
    const [username, setUsername] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            if (!isLoggedIn) return;
            const response = await fetch("http://localhost:5000/api/auth/me", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            });
            const data = await response.json();
            setUsername(data.data.username);
        };
        fetchUserData();
        }, [isLoggedIn]);

    const createTodo = async (e) => {
        e.preventDefault();
        // const title = document.getElementById('title').value;
        // const desc = document.getElementById('desc').value;
        // const token = localStorage.getItem('token');
    }

    return (
        <>
            <Navbar></Navbar>
            <div className="create">
                <h1>Create New Todo</h1>
                <p>Title</p>
                <input type="text" name="title" id="title" />vsco
                <br />
                <p>Description</p>
                <textarea name="desc" id="desc" cols="30" rows="15"></textarea>
                <br />
                <button onClick={createTodo}>Create Todo</button>
                <a href="/todos">Go Back Home</a>
            </div>
        </>
      );
}
 
export default CreateTodo;