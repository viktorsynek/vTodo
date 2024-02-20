import Navbar from './Navbar'

const ForgotPassword = () => {
    return (
        <>
            <Navbar />
            <div className="password">
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