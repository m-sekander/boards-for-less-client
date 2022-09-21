import './NavBar.scss';
import { Link } from 'react-router-dom';
import overview from '../../assets/images/overview.svg';
import post from '../../assets/images/post.svg';
import rent from '../../assets/images/rent.svg';


function NavBar() {
    return (
        <nav className='nav-bar'>
            <div className='nav-bar__links'>
                <Link className="nav-bar__link" to="/account">
                    <img className="nav-bar__icon" src={overview} alt="overview icon" />
                    My Account
                </Link>
                <Link className="nav-bar__link" to="/post">
                    <img className="nav-bar__icon" src={post} alt="post icon" />
                    Post Board Game
                </Link>
                <Link className="nav-bar__link" to="/rent">
                    <img className="nav-bar__icon" src={rent} alt="rent icon" />
                    Rent Board Game
                </Link>
            </div>
            <span className='nav-bar__footer'>A capstone pursuit by <br/> Moin Sekander</span>
        </nav>
    )
}

export default NavBar;