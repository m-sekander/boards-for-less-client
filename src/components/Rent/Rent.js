import './Rent.scss';
import axios from 'axios';
import { useState, useEffect } from 'react';
import searchIcon from '../../assets/images/search.svg';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { Link } from 'react-router-dom'

function Rent() {
    const [currLocation, setCurrLocation] = useState(null);
    const [listings, setListings] = useState(null);
    const [addresses, setAddresses] = useState(null);
    const [coordinates, setCoordinates] = useState(null);
    const [emptySearch, setEmptySearch] = useState(false);

    const token = localStorage.getItem('token');

    const options = { 
        mapId: "658aa220ecc8edae",
        disableDefaultUI: true,
        zoomControl: true,
        scrollwheel: false,
        clickableIcons: false,
        minZoom: 8,
        maxZoom: 20
    }

    const currLocationMarker = {
        path: "M24-8c0 4.4-3.6 8-8 8h-32c-4.4 0-8-3.6-8-8v-32c0-4.4 3.6-8 8-8h32c4.4 0 8 3.6 8 8v32z",
        fillColor: "royalblue",
        fillOpacity: 0.75,
        strokeWeight: 1.5,
        scale: 0.25,
    }

    function handleSearch(event) {
        event.preventDefault();

        if (event.target.name.value === "") {
            return setEmptySearch(!emptySearch);
        }

        const boardgameNameArr = event.target.name.value.split(" ");
        const capitalizedBoardgameNameArr = boardgameNameArr.map((item) => {
            return item[0].toUpperCase() + item.slice(1)
        })
        const boardgameNameParamFormat = capitalizedBoardgameNameArr.join("+");

        axios.get(`http://localhost:7070/boardgames/${boardgameNameParamFormat}/?lat=${currLocation.lat}&lng=${currLocation.lng}`, {
            headers: {
                authorization: `Bearer: ${token}`
            }
        }).then((result) => {
            const boardgameListings = result.data.sortedBoardgames.map((item) => {
                const addressArr = item.address.split(",");
                const shortAddress = addressArr[0] + "," + addressArr[1];
                item["short_address"] = shortAddress
                const coordinatesArr = item.coordinates.split(",");
                item["proper_coordinates"] = {lat: Number(coordinatesArr[0]), lng: Number(coordinatesArr[1])};
                return item;
            })
            const uniqueAddresses = [];
            const uniqueCoordinates = [];
            boardgameListings.forEach((item) => {
                if (!uniqueAddresses.includes(item.short_address)) {
                    uniqueAddresses.push(item.short_address);
                    uniqueCoordinates.push(item.proper_coordinates);
                }
            })
            setListings(boardgameListings);
            setAddresses(uniqueAddresses);
            setCoordinates(uniqueCoordinates);
        }).catch((error) => {
            console.log("For devs:", error);
            setListings(null);
            setAddresses(null);
            setCoordinates(null);
        })
    }

    useEffect(() => {
    //     axios.post('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDMuQtxPW9rkoF6PnC1jwjnxorhrfuAQxA', {})
    //     .then((result) => {
    //         setCurrLocation(result.data.location);
    //         axios.get(`http://localhost:7070/boardgames/?lat=${43.651670}&lng=${-79.397140}`, {
    //             headers: {
    //                 authorization: `Bearer: ${token}`
    //             }
    //         }).then((result) => {
    //             const boardgameListings = result.data.sortedBoardgames.map((item) => {
    //                 const addressArr = item.address.split(",");
    //                 const shortAddress = addressArr[0] + "," + addressArr[1];
    //                 item["short_address"] = shortAddress
    //                 const coordinatesArr = item.coordinates.split(",");
    //                 item["proper_coordinates"] = {lat: Number(coordinatesArr[0]), lng: Number(coordinatesArr[1])};
    //                 return item;
    //             })
    //             const uniqueAddresses = [];
    //             const uniqueCoordinates = [];
    //             boardgameListings.forEach((item) => {
    //                 if (!uniqueAddresses.includes(item.short_address)) {
    //                     uniqueAddresses.push(item.short_address);
    //                     uniqueCoordinates.push(item.proper_coordinates);
    //                 }
    //             })
    //             setListings(boardgameListings);
    //             setAddresses(uniqueAddresses);
    //             setCoordinates(uniqueCoordinates);
    //     }).catch((error) => {
    //         console.log("For devs:", error);
    //         setListings(null);
    //         setAddresses(null);
    //         setCoordinates(null);
    //     })
    // }, [token, emptySearch])
        setCurrLocation({lat: 43.651670, lng: -79.397140});
        axios.get(`http://localhost:7070/boardgames/?lat=${43.651670}&lng=${-79.397140}`, {
            headers: {
                authorization: `Bearer: ${token}`
            }
        }).then((result) => {
            const boardgameListings = result.data.sortedBoardgames.map((item) => {
                const addressArr = item.address.split(",");
                const shortAddress = addressArr[0] + "," + addressArr[1];
                item["short_address"] = shortAddress
                const coordinatesArr = item.coordinates.split(",");
                item["proper_coordinates"] = {lat: Number(coordinatesArr[0]), lng: Number(coordinatesArr[1])};
                return item;
            })
            const uniqueAddresses = [];
            const uniqueCoordinates = [];
            boardgameListings.forEach((item) => {
                if (!uniqueAddresses.includes(item.short_address)) {
                    uniqueAddresses.push(item.short_address);
                    uniqueCoordinates.push(item.proper_coordinates);
                }
            })
            setListings(boardgameListings);
            setAddresses(uniqueAddresses);
            setCoordinates(uniqueCoordinates);
        }).catch((error) => {
            console.log("For devs:", error);
            setListings(null);
            setAddresses(null);
            setCoordinates(null);
        })
    }, [token, emptySearch])

    function matchLabel(address) {
        return addresses.indexOf(address) + 1;
    }


    return (
        <div className="rent">
            <h2 className="rent__title">Trying a new board game is just a few clicks away !</h2>
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
                <>
                    <div className="rent__map-container">
                        <GoogleMap zoom={11} center={currLocation} options={options} mapContainerClassName="rent__map">
                            <Marker position={currLocation} icon={currLocationMarker}/>
                                {coordinates && 
                                    coordinates.map((item, i) => {
                                        return <Marker key={i+1} position={item} label={String(i+1)} />
                                    })
                                }
                        </GoogleMap>
                    </div>
                    <div className="rent__listings">
                        <h2 className="rent__subtitle">Listing Results</h2>
                        <div className="rent__gallery">
                            {listings ?
                                listings.map((item, i) => {
                                    return (
                                        <div key={item.id} className="rent__card">
                                            <div className="rent__details">
                                                <span className="rent__listing-name">{item.name}</span>
                                                <span className="rent__listing-address">{matchLabel(item.short_address)}) {item.short_address}</span>
                                            </div>
                                            <Link className="rent__action" to="/">More Details</Link>
                                        </div>
                                    )
                                })
                            :
                                <h3 className="rent__no-listings">Sorry, no listings to show at the moment.</h3>
                            }
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default Rent;