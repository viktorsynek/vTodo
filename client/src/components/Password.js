import Navbar from './Navbar'

const ForgotPassword = () => {

    const forgotPassword = async (e) => {
        e.preventDefault();
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
            alert('Check your email for a reset link');
        } else {
            alert('Email not found');
        }
    }

    return (
        <>
            <Navbar />
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