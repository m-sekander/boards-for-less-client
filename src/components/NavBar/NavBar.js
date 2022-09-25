import './NavBar.scss';
import { NavLink } from 'react-router-dom';
import home from '../../assets/images/home-icon.svg';
import overview from '../../assets/images/overview.svg';
import list from '../../assets/images/list.svg';
import rent from '../../assets/images/rent.svg';


function NavBar({isLoggedIn}) {
    return (
        <nav className='nav-bar'>
            {isLoggedIn ?
                <div className='nav-bar__links'>
                    <NavLink className="nav-bar__link" to="/" end>
                        <img className="nav-bar__icon" src={home} alt="home icon" />
                        Home
                    </NavLink>
                    <NavLink className="nav-bar__link" to="/account">
                        <img className="nav-bar__icon" src={overview} alt="overview icon" />
                        My Account
                    </NavLink>
                    <NavLink className="nav-bar__link" to="/rent">
                        <img className="nav-bar__icon nav-bar__icon--reverse" src={rent} alt="rent icon" />
                        Rent Board Game
                    </NavLink>
                    <NavLink className="nav-bar__link" to="/list">
                        <img className="nav-bar__icon" src={list} alt="list icon" />
                        List Board Game
                    </NavLink>
                </div>
            :
                <div className='nav-bar__links'>
                    <NavLink className="nav-bar__link" to="/login">
                        Login
                    </NavLink>
                    <NavLink className="nav-bar__link" to="/register">
                        Register
                    </NavLink>
                </div>
            }
            <span className='nav-bar__footer'>A capstone pursuit by <br/> Moin Sekander</span>
        </nav>
    )
}

export default NavBar;