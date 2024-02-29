import Navbar from './Navbar'

const ResetPassword = () => {

    const resetPassword = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/resetpassword', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: document.querySelector('input[type="password"]').value,
            })
        });

        const data = await response.json();
        if(data.success){
            alert('Check your email for a reset link');
        } else {
            alert('Email not found');
        }
    }

    return (
        <>
            <Navbar />
            <div onSubmit={resetPassword} className="password">
                <h1>Reset Password</h1>
                <div className="container">
                <form action="" method="post">
                    <div className="txt_field">
                        <p id='np'>New Password</p>
                        <input type="password" placeholder=''required/>
                        <p id='cp'>Confirm Password</p>
                        <input type="password" placeholder=''required/>
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