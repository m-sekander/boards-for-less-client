import './Header.scss';
import logo from '../../assets/images/logo_transparent.png';
import { Link } from 'react-router-dom'
import CTA from '../CTA/CTA';

function Header() {
    return (
        <header className='header'>
            <Link to="/"><img className='header__logo' src={logo} alt="application logo" /></Link>
            <div className='header__right'>
                <h3 className='header__welcome'>Welcome, [Name]</h3>
                <CTA text="Logout" link="/" isButton={true} isSpecial={true} />
            </div>
        </header>
    )
}

export default Header;