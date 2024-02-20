import Navbar from './Navbar';
import '../css/reglog.css';
import {Link} from 'react-router-dom';


const Login = () => {
return ( 
    <>
        <Navbar></Navbar>
        <form className="login reglog">
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