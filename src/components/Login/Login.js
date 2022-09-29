import CTA from '../CTA/CTA';
import './Login.scss';
import axios from 'axios';
import { useState } from 'react';

function Login() {
    const [message, setMessage] = useState(null);
    const [isSuccessful, setIsSuccessful] = useState(false);

    function onSubmit(event) {
        event.preventDefault();
        
        axios.post(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/auth/login`, {
            email: event.target.email.value,
            password: event.target.password.value
        }).then((result) => {
            setMessage(result.data.message);
            setIsSuccessful(true);
            localStorage.setItem('token', result.data.token);
            event.target.reset();

            setTimeout(() => {
                window.location.assign("/");
            }, 2000);
        }).catch((error) => {
            console.log("For devs:", error);
            if (error.response.data.message) {
                setMessage(error.response.data.message);
                if (error.response.data.message.toLowerCase().includes("user")) {
                    event.target.email.focus();
                } else if (error.response.data.message.toLowerCase().includes("credentials")) {
                    event.target.password.focus();
                }
            }
        })
    }


    return (
        <div className='login'>
            <h2 className={`login__title ${message ? (isSuccessful ? 'login__title--successful' : 'login__title--error') : ""}`}>{message ? message : "Please login to continue."}</h2>
            <form className='login__form' onSubmit={onSubmit}>
                <label className="login__label" htmlFor="email">
                    Email :
                    <input className="login__input" type="text" name="email" id="email" />
                </label>
                <label className="login__label" htmlFor="password">
                    Password :
                    <input className="login__input" type="password" name="password" id="password" />
                </label>
                <div className='login__actions'>
                    <CTA text="Register" link="/register" />
                    <CTA text="Login" isButton={true} />
                </div>
            </form>
        </div>
    )
}

export default Login;