import CTA from '../CTA/CTA';
import './Register.scss';
import axios from 'axios';
import { useState } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';


function Register() {
    const [message, setMessage] = useState(null);
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [address, setAddress] = useState("");
    const searchOptions = { region: "CA", types: ["address"] }

    function handleChange(address) {
        setAddress(address);
    }
    function handleSelect(address) {
        setAddress(address);
    }

    function handleSignup(event) {
        event.preventDefault();
        let formattedAddress;

        geocodeByAddress(event.target.address.value)
        .then((result) => {
            formattedAddress = result[0].formatted_address;
            return getLatLng(result[0])
        }).then((result) => {
            const coordinateStr = `${result.lat},${result.lng}`
            return axios.post("http://localhost:7070/auth/signup", {
                email: event.target.email.value,
                name: event.target.name.value,
                password: event.target.password.value,
                confirmPassword: event.target.confirmPassword.value,
                address: formattedAddress,
                coordinates: coordinateStr
            }).then((result) => {
                console.log("For devs:", result);
                setMessage(result.data.message);
                setIsSuccessful(true);
    
                setTimeout(() => {
                    setMessage(null);
                    setIsSuccessful(false);
                    setAddress("");
                    event.target.reset();
                }, 2000);
            })
        }).catch((error) => {
            console.log("For devs:", error);
            if (error.response.data.message) {
                setMessage(error.response.data.message);
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
                    <PlacesAutocomplete
                        value={address}
                        onChange={handleChange}
                        onSelect={handleSelect}
                        searchOptions={searchOptions}
                    >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
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
                                {loading && <div>Loading...</div>}
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