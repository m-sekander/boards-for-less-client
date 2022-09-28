import GameCard from '../GameCard/GameCard';
import './Account.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Account() {
    const [userDetails, setUserDetails] = useState(null);
    const [userListings, setUserListings] = useState(null);
    const [contentExpansion, setContentExpansion] = useState(false);
    
    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get("http://localhost:7070/users/", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((result) => {
            setUserDetails(result.data);
            return axios.get("http://localhost:7070/boardgames/user", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((result) => {
                const listings = result.data.result;
                listings.map((item) => {
                    const wordedDate = String(new Date(item["available_until"]));
                    item["formattedAvailableUntil"] = wordedDate.slice(4, 10) + "," + wordedDate.slice(10, 15);
                    return item;
                })
                setUserListings(listings);
            })
        }).catch((error) => {
            console.log("For devs:", error);
        });
    }, [token]);


    if (!userDetails) {
        return;
    }

    return (
        <div className={`account ${contentExpansion ? "account--expanded" : ""}`}>
            <h2 className="account__title">My Account</h2>
            <form className='account__form'>
                <h2 className='account__subtitle'>User Details</h2>
                <div className='account__inputs'>
                    <label className="account__label" htmlFor="email">
                        Email :
                        <input className="account__input" type="text" name="email" id="email" defaultValue={userDetails.email} disabled />
                    </label>
                    <label className="account__label" htmlFor="name">
                        Name :
                        <input className="account__input" type="text" name="name" id="name" defaultValue={userDetails.name} disabled />
                    </label>
                    <label className="account__label account__label--big" htmlFor="name">
                        Address :
                        <input className="account__input" type="text" name="address" id="address" defaultValue={userDetails.address} disabled />
                    </label>
                </div>
            </form>
            <div className="account__post-list">
                <h2 className='account__subtitle'>Your Listed Games</h2>
                <div className="account__gallery">
                    {userListings &&
                        userListings.map((item) => {
                            return <GameCard key={item.id} token={token} id={item.id} isOwner={true} name={item.name} priceWeekly={item.price_weekly} availableUntil={item.formattedAvailableUntil} setContentExpansion={setContentExpansion} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Account;