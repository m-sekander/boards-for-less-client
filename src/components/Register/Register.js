import CTA from '../CTA/CTA';
import './Register.scss';

function Register() {
    function onSubmit(event) {
        event.preventDefault();
        console.log("Submitted");
    }


    return (
        <div className='register'>
            <h2 className='register__title'>Please fill in all details to create an account.</h2>
            <form className='register__form' onSubmit={onSubmit}>
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
                    <CTA text="Register" isButton={true} />
                </div>
            </form>

        </div>
    )
}

export default Register;