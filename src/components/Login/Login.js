import CTA from '../CTA/CTA';
import './Login.scss';

function Login() {
    function onSubmit(event) {
        event.preventDefault();
        console.log("Submitted");
    }


    return (
        <div className='login'>
            <h2 className='login__title'>Please login to continue.</h2>
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
                    <CTA text="Sign Up" link="/register" />
                    <CTA text="Login" isButton={true} />
                </div>
            </form>

        </div>
    )
}

export default Login;