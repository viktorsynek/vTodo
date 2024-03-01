import Navbar from './Navbar'
import ErrorMessage from './ErrorMessage';
import SucessMessage from './SucessMessage';
import React, { useState } from 'react';

const ForgotPassword = () => {
    const [errorMsg, setErrorMsg] = useState('');
    const [sucessMsg, setSucessMsg] = useState('');

    const forgotPassword = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        setSucessMsg('');
        const email = e.target.querySelector('input[type="email"]').value;
        if (!email) {
            setErrorMsg('Please provide an email');
            return;
        }
        const response = await fetch('http://localhost:5000/api/auth/forgotpassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: document.querySelector('input[type="email"]').value,
            })
        });

        const data = await response.json();
        if(data.success){
            setSucessMsg('Check your email for a reset link. Also check your spam folder');
        } else {
            setErrorMsg(data.message);
        }
    }

    return (
        <>
            <Navbar />
            {errorMsg && <ErrorMessage errorMsg={errorMsg} />}
            {sucessMsg && <SucessMessage sucessMsg={sucessMsg} />}
            <div onSubmit={forgotPassword} className="password">
                <h1>Forgot Password</h1>
                <h4>
                    Enter your email, and you will get a mail with a link in it.
                    <br />
                    Open the link to create a new password.
                </h4>
                <div className="container">
                <form action="" method="post">
                    <div className="txt_field">
                        <p>Email</p>
                        <input type="email" placeholder=''required/>
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
 
export default ForgotPassword;