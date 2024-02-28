import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';



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

    return ( 
    <>
        <Navbar></Navbar>
        <div className='box'>
            <div className='search-box'>
                <button id='add'>Add Task</button>
            </div>
            <div className='todos'>
                <div className="todo todo1">
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
                <div className="todo todo2">
                <div>
                    <input type="checkbox" name='check'/>
                    </div>
                    <div className='left'>
                        <h3>Create a C++ project 👩‍💻</h3>
                        <p>2024/02/20 11:33PM</p>
                    </div>
                    <div className='right'>
                        <button><FontAwesomeIcon icon={faPen} /></button>
                        <button><FontAwesomeIcon icon={faTrash} /></button>
                    </div>
                </div>
                <div className="todo todo2">
                <div>
                    <input type="checkbox" name='check'/>
                    </div>
                    <div className='left'>
                        <h3>Create a Python project 🐍</h3>
                        <p>2024/02/20 11:41PM</p>
                    </div>
                    <div className='right'>
                        <button><FontAwesomeIcon icon={faPen} /></button>
                        <button><FontAwesomeIcon icon={faTrash} /></button>
                    </div>
                </div>
                <div className="todo todo2">
                <div>
                    <input type="checkbox" name='check'/>
                    </div>
                    <div className='left'>
                        <h3>Create a Java project ☕</h3>
                        <p>2024/02/20 11:49PM</p>
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

