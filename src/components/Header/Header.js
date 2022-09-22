import './Header.scss';
import logo from '../../assets/images/logo_transparent.png';
import { Link, useNavigate } from 'react-router-dom'
import CTA from '../CTA/CTA';

function Header({isLoggedIn}) {
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("token");
        window.location.assign("/");
    }

    return (
        <header className='header'>
            <Link to="/"><img className='header__logo' src={logo} alt="application logo" /></Link>
            {isLoggedIn &&
                <div className='header__right'>
                    <h3 className='header__welcome'>Welcome, [Name]</h3>
                    <CTA text="Logout" link="/" isButton={true} isSpecial={true} onClick={handleLogout} />
                </div>
            }
        </header>
    )
}

export default Header;