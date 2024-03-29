import CTA from '../CTA/CTA';
import './Register.scss';
import axios from 'axios';
import { useState } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';


function Register() {
    const [message, setMessage] = useState(null);
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [address, setAddress] = useState("");
    const searchOptions = { types: ["address"] }

    function handleChange(address) {
        setAddress(address);
    }
    function handleSelect(address) {
        setAddress(address);
    }

    function handleSignup(event) {
        event.preventDefault();
        setMessage("Please wait...");
        let formattedAddress;

        if (!event.target.address.value) {
            setMessage("Please make sure to provide all fields in the request");
            return;
        }

        // returns promised that contains properly formatted address
        geocodeByAddress(event.target.address.value)
        .then((result) => {
            console.log(result[0])
            formattedAddress = result[0].formatted_address;
            // returns promise that gives lat and lng of user input address for coordinate markers
            return getLatLng(result[0])
        }).then((result) => {
            const coordinateStr = `${result.lat},${result.lng}`
            return axios.post(`${process.env.REACT_APP_SERVER}/auth/signup`, {
                email: event.target.email.value,
                name: event.target.name.value,
                password: event.target.password.value,
                confirmPassword: event.target.confirmPassword.value,
                address: formattedAddress,
                coordinates: coordinateStr
            }).then((result) => {
                setMessage(result.data.message);
                setIsSuccessful(true);
    
                setTimeout(() => {
                    window.location.assign("/");
                }, 2000);
            })
        }).catch((error) => {
            console.log("For devs:", error);
            if (error.response.data.message) {
                setMessage(error.response.data.message);
                if (error.response.data.message.toLowerCase().includes("email")) {
                    event.target.email.focus();
                } else if (error.response.data.message.toLowerCase().includes("password")) {
                    event.target.password.focus();
                }
            }
        });
    }

    
    return (
        <div className='register'>
            <h2 className={`register__title ${message ? (isSuccessful ? 'register__title--successful' : 'register__title--error') : ""}`}>{message ? message : "Please fill in all details to create an account."}</h2>
            <form className='register__form' onSubmit={handleSignup}>
                <div className='register__inputs'>
                    <label className="register__label" htmlFor="email">
                        Email :
                        <input className="register__input" type="text" name="email" id="email" />
                    </label>
                    <label className="register__label" htmlFor="name">
                        Name :
                        <input className="register__input" type="text" name="name" id="name" />
                    </label>
                    <label className="register__label" htmlFor="password">
                        Password :
                        <input className="register__input" type="password" name="password" id="password" />
                    </label>
                    <label className="register__label" htmlFor="confirmPassword">
                        Confirm Password :
                        <input className="register__input" type="password" name="confirmPassword" id="confirmPassword" />
                    </label>
                    {/* component that generates address suggestions via Google Maps based on user input */}
                    <PlacesAutocomplete
                        value={address}
                        onChange={handleChange}
                        onSelect={handleSelect}
                        searchOptions={searchOptions}
                    >
                        {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                        <label className="register__label" htmlFor="address">
                            Home Address :
                            <input
                            {...getInputProps({
                                className: 'register__input register__address',
                                name: "address",
                                id: "address",

                            })}
                            />
                            <div className="register__suggestions">
                                {suggestions.slice(0, 3).map(suggestion => {
                                    const className = 'register__suggestion'
                                    return (
                                    <div key={suggestion.placeId}
                                        {...getSuggestionItemProps(suggestion, {
                                        className
                                        })}
                                    >
                                        <span>{suggestion.description}</span>
                                    </div>
                                    );
                                })}
                            </div>
                        </label>
                        )}
                    </PlacesAutocomplete>
                </div>
                <div className='register__actions'>
                    <CTA text="Go Back" link="/" isSpecial={true} />
                    <CTA text="Submit" isButton={true} />
                </div>
            </form>
        </div>
    )
}

export default Register;