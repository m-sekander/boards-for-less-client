import CTA from '../CTA/CTA';
import './Register.scss';
import axios from 'axios';
import { useState } from 'react';

function Register() {
    const [message, setMessage] = useState(null);

    function handleSignup(event) {
        event.preventDefault();

        axios.post("http://localhost:7070/auth/signup", {
            email: event.target.email.value,
            name: event.target.name.value,
            password: event.target.password.value,
            confirmPassword: event.target.confirmPassword.value,
            address: event.target.address.value,
            coordinates: "placeholder"
        }).then((result) => {
            console.log("For devs:", result);
            setMessage(result.data.message);

            setTimeout(() => {
                setMessage(null);
                event.target.reset();
            }, 2000);
        }).catch((error) => {
            console.log("For devs:", error);
            setMessage(error.response.data.message);
        })
    }


    return (
        <div className='register'>
            <h2 className='register__title'>{message ? message : "Please fill in all details to create an account."}</h2>
            <form className='register__form' onSubmit={handleSignup}>
                <div className='register__inputs'>
                    <label className="register__label" htmlFor="email">
                        Email :
                        <input className="register__input" type="text" name="email" id="email" />
                    </label>
                    <label className="register__label" htmlFor="name">
                        Name :
                        <input className="register__input" type="text" name="name" id="name" />
                    </label>
                    <label className="register__label" htmlFor="password">
                        Password :
                        <input className="register__input" type="password" name="password" id="password" />
                    </label>
                    <label className="register__label" htmlFor="confirmPassword">
                        Confirm Password :
                        <input className="register__input" type="password" name="confirmPassword" id="confirmPassword" />
                    </label>
                    <label className="register__label" htmlFor="address">
                        Address :
                        <input className="register__input register__address" type="text" name="address" id="address" />
                    </label>
                </div>
                <div className='register__actions'>
                    <CTA text="Go Back" link="/" isSpecial={true} />
                    <CTA text="Submit" isButton={true} />
                </div>
            </form>
        </div>
    )
}

export default Register;