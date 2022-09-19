import './Header.scss';
import logo from '../../assets/images/logo.png';
import { Link } from 'react-router-dom'

function Header() {
    return (
        <section className='header'>
            <Link to="/"><img className='header__logo' src={logo} alt="application logo" /></Link>
            <div className='header__right'>
                <h3>Welcome, [Username]</h3>
                <button className='header__logout'>Logout</button>
            </div>
        </section>
    )
}

export default Header;