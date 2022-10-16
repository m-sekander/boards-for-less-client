import './Header.scss';
import logo from '../../assets/images/logo_transparent.png';
import { Link } from 'react-router-dom'
import CTA from '../CTA/CTA';
import axios from 'axios';
import { useState, useEffect } from 'react';

function Header({isLoggedIn}) {
    const [name, setName] = useState("");

    function handleLogout() {
        localStorage.removeItem("token");
        window.location.assign("/");
    }

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            return;
        }
        
        axios.get(`${process.env.REACT_APP_SERVER}/users/name`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((result) => {
            const nameArr = result.data.name.split(" ");
            setName(nameArr[0]);
        }).catch((error) => {
            console.log("For devs:", error);
        });
    }, []);

    
    return (
        <header className='header'>
            <Link to="/"><img className='header__logo' src={logo} alt="application logo" /></Link>
            {isLoggedIn &&
                <div className='header__right'>
                    {name && <h3 className='header__welcome'>Welcome, {name}</h3>}
                    <CTA text="Logout" link="/" isButton={true} isSpecial={true} onClick={handleLogout} />
                </div>
            }
        </header>
    )
}

export default Header;