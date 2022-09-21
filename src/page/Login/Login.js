import CTA from '../../components/CTA/CTA';
import './Login.scss';

function Login() {
    function onSubmit(event) {
        event.preventDefault();

    }


    return (
        <div className='login'>
            <h2 className='login__title'>Please login to continue...</h2>
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
                    <CTA text="Submit" isButton={true} />
                </div>
            </form>

        </div>
    )
}

export default Login;