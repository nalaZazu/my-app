import React, { useState } from 'react'
import '../assets/Login.css'
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase"


function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const signIn = (e) => {
        e.preventDefault();
        // some fancy firebase login...
        auth
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
                if (auth) {
                    navigate("/", { replace: true });
                }
            })
            .catch(error => alert(error.message))

    }
    const register = (e) => {
        e.preventDefault();
        // do some fancy firebase register...
        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                // successsfully created a new user with email and password
                console.log(auth);
                if (auth) {
                    navigate("/", { replace: true });
                }
            })
            .catch(error => alert(error.message))
    }
    return (
        <div className='login'>
            <Link to='/'>
                <img className='login_logo' src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/603px-Amazon_logo.svg.png" alt="Logo" />
            </Link>
            <div className="login_container">
                <h1>Sign-in</h1>
                <form>
                    <h5>Email</h5>
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                    <h5>Password</h5>
                    <input type="password" value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <button type='submit'
                        onClick={signIn}
                        className='login_signInButton'>Sign In</button>
                </form>
                <p>By signing-in you agree to the  Amazon Fake Clone Conditions of Use & Sale.Please see our Privacy Notice, our Cookies Noties and our Interest-Based Ads Notice.</p>
                <button onClick={register} className='login_registerButton'>Create your  Amazon Account </button>
            </div>
        </div>
    )
}

export default Login;