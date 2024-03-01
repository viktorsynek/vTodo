import { useState } from 'react';
import Navbar from './Navbar';
import ErrorMessage from './ErrorMessage';
import SucessMessage from './SucessMessage';

const ResetPassword = () => {
    const [errorMsg, setErrorMsg] = useState('');
    const [sucessMsg, setSucessMsg] = useState('');

    const currentUrl = window.location.href;
    const token = currentUrl.split('=').pop();

    const resetPassword = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        setSucessMsg('');
        const password = e.target.querySelector('input[type="password"]').value;
        const confirmPassword = e.target.querySelector('input[name="confirm-password"]').value;

        if (!password || !confirmPassword) {
            setErrorMsg('Please provide a password');
            return;
        }
        if(password !== confirmPassword){
            setErrorMsg('Passwords do not match');
        }

        const response = await fetch(`http://localhost:5000/api/auth/resetPassword/${token}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({password:password, token: token})
        });

        const data = await response.json();
        if(data.success){
            setSucessMsg('Password reset successful!');
        } else {
            setErrorMsg(data.message);
        }
    }

    return (
        <>
            <Navbar />
            {errorMsg && <ErrorMessage errorMsg={errorMsg} />}
            {sucessMsg && <SucessMessage sucessMsg={sucessMsg} />}
            <div onSubmit={resetPassword} className="password">
                <h1>Reset Password</h1>
                <div className="container">
                <form action="" method="post">
                    <div className="txt_field">
                        <p id='np'>New Password</p>
                        <input type="password" placeholder=''required/>
                        <p id='cp'>Confirm Password</p>
                        <input type="password" placeholder='' name='confirm-password' required/>
                    </div>
                    <div>
                        <input type="submit" value={"Send"}/>
                    </div>
                </form>
                </div>
            </div>
        </>
    );
}
 
export default ResetPassword;