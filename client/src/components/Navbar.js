import {Link} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, [navigate]);

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


    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/login');
    };

    return ( 
    <>
    <div className="topnav">
        <div className="flex">
            <ul className='topnav-items'>
                <li><Link to="/" id='title'>vTodo</Link></li>
            </ul>
            <ul className='topnav-items'>

            {isLoggedIn ? (
                <>
                    <li style={{ color: '#6466f8' }}>
                    {username === 'viktorsynek' ? (
                        <>
                        <FontAwesomeIcon icon={faCode} style={{ margin: 0, marginRight: '15px' }} />
                        {username}
                        </>
                    ) : (
                        username
                    )}
                    </li>
                    <li><button onClick={handleLogout}>Logout</button></li>
                </>
            ) : (
                <>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                </>
            )}
            </ul>
        </div>
    </div>
    </>
    );
}
 
export default Navbar;