import './NavBar.scss';
import { Link } from 'react-router-dom';
import overview from '../../assets/images/overview.svg';
import post from '../../assets/images/post.svg';
import rent from '../../assets/images/rent.svg';
import { useState } from 'react';


function NavBar() {
    const [navHover, setNavHover] = useState(false);

    return (
        <div className='nav-bar'>
            <div className='nav-bar__links'>
                <Link className={`nav-bar__link ${navHover && 'nav-bar__link--hover'}`} to="/account">
                    <img className={`nav-bar__icon ${navHover && 'nav-bar__icon--hover'}`} src={overview} alt="overview icon" />
                    My Account
                </Link>
                <Link className={`nav-bar__link ${navHover && 'nav-bar__link--hover'}`} to="/post">
                    <img className={`nav-bar__icon ${navHover && 'nav-bar__icon--hover'}`} src={post} alt="post icon" />
                    Post Board Game
                </Link>
                <Link className={`nav-bar__link ${navHover && 'nav-bar__link--hover'}`} to="/rent">
                    <img className={`nav-bar__icon ${navHover && 'nav-bar__icon--hover'}`} src={rent} alt="rent icon" />
                    Rent Board Game
                </Link>
            </div>
            <span className='nav-bar__footer'>A capstone pursuit by <br/> Moin Sekander</span>
        </div>
    )
}

export default NavBar;