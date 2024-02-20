import Navbar from './Navbar';
import '../css/reglog.css';

const Register = () => {
  return ( 
    <>
        <Navbar></Navbar>
        <form className="register reglog">
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