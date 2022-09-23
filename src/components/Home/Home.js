import './Home.scss';
import { Link } from 'react-router-dom';
import playing from '../../assets/images/friends-playing-game.png'
import handing from '../../assets/images/handing-parcel-to-customer.png'

function Home() {
    return (
        <div className='home'>
            <h2 className='home__title'>Choose your adventure !</h2>
            <div className='home__links'>
                <Link to="/rent" className="home__link home__link--try">
                    <img className="home__image--try" src={playing} alt="friends playing jenga" />
                    <div className='home__text'>
                        <h1>Try</h1>
                        <h3 className='home__foot'>A board game</h3>
                    </div>
                </Link>
                <Link to="/list" className="home__link home__link--share">
                    <img className="home__image--share" src={handing} alt="woman handing parcel for delivery" />
                    <div className='home__text'>
                        <h1>Share</h1>
                        <h3 className='home__foot'>A board game</h3>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Home;