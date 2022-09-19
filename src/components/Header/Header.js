import './Header.scss';
import logo from '../../assets/images/logo.png';
import { Link } from 'react-router-dom'
import CTA from '../CTA/CTA';

function Header() {
    return (
        <section className='header'>
            <Link to="/"><img className='header__logo' src={logo} alt="application logo" /></Link>
            <div className='header__right'>
                <h3 className='header__welcome'>Welcome, [Name]</h3>
                <CTA text="Logout" link="/"/>
            </div>
        </section>
    )
}

export default Header;