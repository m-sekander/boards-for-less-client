import './Rent.scss';
import axios from 'axios';
import { useState, useEffect } from 'react';
import searchIcon from '../../assets/images/search.svg';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { Link } from 'react-router-dom'

function Rent() {
    const [message, setMessage] = useState(null);
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [currLocation, setCurrLocation] = useState(null);

    const currLocationMarker = {
        path: "M24-8c0 4.4-3.6 8-8 8h-32c-4.4 0-8-3.6-8-8v-32c0-4.4 3.6-8 8-8h32c4.4 0 8 3.6 8 8v32z",
        fillColor: "royalblue",
        fillOpacity: 0.875,
        strokeWeight: 1.5,
        scale: 0.25,
    }

    function handleSearch(event) {
        event.preventDefault();

        console.log("Submitted");
    }

    useEffect(() => {
        axios.post('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDMuQtxPW9rkoF6PnC1jwjnxorhrfuAQxA', {})
        .then((result) => {
            setCurrLocation(result.data.location);
        }).catch((error) => {
            console.log("For devs:", error);
        })
    }, [])


    return (
        <div className="rent">
            <h2 className={`rent__title ${message ? (isSuccessful ? 'rent__title--successful' : 'rent__title--error') : ""}`}>{message ? message : "Trying a new board game is just a few clicks away !"}</h2>
            <form className="rent__form" onSubmit={handleSearch}>
                <label className="rent__label" htmlFor="name">
                    Search for a board game :
                    <div className="rent__field">
                        <input className="rent__input" type="search" name="name" id="name" />
                        <button className="rent__search"><img className="rent__icon" src={searchIcon} alt="" /></button>
                    </div>
                </label>
            </form>
            {currLocation &&
                <div className="rent__map-container">
                    <GoogleMap zoom={10} center={currLocation} options={{ mapId: "658aa220ecc8edae", disableDefaultUI: true }} mapContainerClassName="rent__map">
                        <Marker position={currLocation} icon={currLocationMarker} />
                    </GoogleMap>
                </div>
            }
            <div className="rent__listings">
                <h2 className="rent__subtitle">Matched Listings</h2>
                <div className="rent__gallery">
                    <div className="rent__card">
                        <div className="rent__details">
                            <span>Board Game Name</span>
                            <span>Board Game Address</span>
                        </div>
                        <Link className="rent__action" to="/">More Details</Link>
                    </div>
                    <div className="rent__card">
                        <div className="rent__details">
                            <span>Board Game Name</span>
                            <span>Board Game Address</span>
                        </div>
                        <Link className="rent__action" to="/">More Details</Link>
                    </div>
                    <div className="rent__card">
                        <div className="rent__details">
                            <span>Board Game Name</span>
                            <span>Board Game Address</span>
                        </div>
                        <Link className="rent__action" to="/">More Details</Link>
                    </div>
                    <div className="rent__card">
                        <div className="rent__details">
                            <span>Board Game Name</span>
                            <span>Board Game Address</span>
                        </div>
                        <Link className="rent__action" to="/">More Details</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Rent;