import {Link} from 'react-router-dom';

const Navbar = () => {
    return ( 
    <>
    <div className="topnav">
        <div className="flex">
            <ul className='topnav-items'>
                <li><Link to="/" id='title'>vTodo</Link></li>
            </ul>
            {/* <ul className='topnav-items'>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Signup</Link></li>
            </ul> */}
            <ul className='topnav-items'>
                <li><Link to="/login">username</Link></li>
                <li><Link to="/register">Logout</Link></li>
            </ul>
        </div>
    </div>
    </>
    );
}
 
export default Navbar;