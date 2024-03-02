import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';



const Todos = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        } else {
            window.location.href = '/login';
        }
    }, []);

    if (!isLoggedIn) {
        return null;
    }

    const searchTodo = async (e) => {
        e.preventDefault();
        const search = document.getElementById('search').value;
        console.log(`searching todo named: ${search}`);
    }

    const createTodo = async (e) => {
        e.preventDefault();
        window.location.href = '/create-todo';
    }


    return ( 
    <>
        <Navbar></Navbar>
        <div className='box'>
            <div className='search-box'>
                <button onClick={createTodo} id='add'>Add Task</button>
                <input id='search' type="text" name='search' placeholder='Search by title . . .'/>
                <button onClick={searchTodo} id='search-btn'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
            <div className='todos'>
                <div className="todo">
                    <div>
                        <input type="checkbox" name='check'/>
                    </div>
                    <div className='left'>
                        <h3>Create a react project 🔥</h3>
                        <p>2024/02/20 5:23AM</p>
                    </div>
                    <div className='right'>
                        <button><FontAwesomeIcon icon={faPen} /></button>
                        <button><FontAwesomeIcon icon={faTrash} /></button>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}
 
export default Todos;

