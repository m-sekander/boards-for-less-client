import './NavBar.scss';
import { NavLink } from 'react-router-dom';
import overview from '../../assets/images/overview.svg';
import post from '../../assets/images/post.svg';
import rent from '../../assets/images/rent.svg';


function NavBar({isLoggedIn}) {
    return (
        <nav className='nav-bar'>
            {isLoggedIn ?
                <div className='nav-bar__links'>
                    <NavLink className="nav-bar__link" to="/account">
                        <img className="nav-bar__icon" src={overview} alt="overview icon" />
                        My Account
                    </NavLink>
                    <NavLink className="nav-bar__link" to="/post">
                        <img className="nav-bar__icon" src={post} alt="post icon" />
                        Post Board Game
                    </NavLink>
                    <NavLink className="nav-bar__link" to="/rent">
                        <img className="nav-bar__icon" src={rent} alt="rent icon" />
                        Rent Board Game
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