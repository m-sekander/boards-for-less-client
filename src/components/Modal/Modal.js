import './Modal.scss';
import CTA from '../CTA/CTA';
import closeIcon from '../../assets/images/close.svg';
import axios from 'axios';
import { useState, useEffect } from 'react';

function Modal({ isOwner, ownerEmail, boardgameName, boardgameId, setModalActive, setContentExpansion }) {
    const [details, setDetails] = useState(null);

    const token = localStorage.getItem('token');
    const server = process.env.REACT_APP_SERVER;

    function clickHandler(event) {
        event.preventDefault();

        setModalActive(false);
        setContentExpansion(false);
    }

    function preventClickHandler(event) {
        event.stopPropagation();
    }

    function handleContact(event) {
        event.preventDefault();

        document.location = `mailto:${ownerEmail}?subject=Interest In Renting: ${event.target.name.value}`;
    }

    function handleDelete(event) {
        event.preventDefault();

        axios.delete(`${server}/boardgames/${boardgameId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((result) => {
            console.log("For devs:", result);
        }).catch((error) => {
            console.log("For devs:", error);
        })

        window.location.assign("/account");
    }

    useEffect(() => {
            axios.get(`${server}/boardgames/details/${boardgameId}/?ownerEmail=${ownerEmail}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((result) => {
                setDetails(result.data.result[0])
            }).catch((error) => {
                console.log("For devs:", error);
            });
    }, [token, boardgameId, ownerEmail, server])
    

    if (!details) {
        return;
    }

    return (
        <div className="modal" onClick={clickHandler}>
            <div className="modal__container" onClick={preventClickHandler}>
                <div className="modal__content">
                    <img className="modal__close" src={closeIcon} alt="" onClick={clickHandler} />
                    <h1 className="modal__title">{boardgameName}</h1>
                    <form className='modal__form' onSubmit={handleContact}>
                        <h2 className='modal__subtitle'>Logistics Details</h2>
                        <div className='modal__inputs'>
                            {!isOwner &&
                                <>
                                    <label className="modal__label" htmlFor="owner">
                                        Owner :
                                        <input className="modal__input" type="text" name="owner" id="owner" defaultValue={details.name} disabled />
                                    </label>
                                    <label className="modal__label" htmlFor="email">
                                        Email :
                                        <input className="modal__input" type="text" name="email" id="email" defaultValue={details.user_email} disabled />
                                    </label>
                                </>
                            }
                            <label className="modal__label" htmlFor="price">
                                Price / Week (CAD) :
                                <input className="modal__input" type="text" name="price" id="price" defaultValue={"$" + details.price_weekly} disabled />
                            </label>
                            <label className="modal__label" htmlFor="availableUntil">
                                Available Until :
                                <input className="modal__input" type="date" name="availableUntil" id="availableUntil" value={details.available_until.slice(0,10)} disabled />
                            </label>
                            <label className="modal__label modal__label--big" htmlFor="name">
                                Address :
                                <input className="modal__input" type="text" name="address" id="address" defaultValue={details.address} disabled />
                            </label>
                        </div>
                        <h2 className='modal__subtitle'>Board Game Details</h2>
                        <div className="modal__inputs">
                            <label className="modal__label" htmlFor="name">
                                Board Game :
                                <input className="modal__input" type="text" name="name" id="name" defaultValue={boardgameName} disabled />
                            </label>
                            <label className="modal__label" htmlFor="category">
                                Category :
                                <input className="modal__input" type="text" name="category" id="category" defaultValue={details.category} disabled />
                            </label>
                            <label className="modal__label" htmlFor="minPlayers">
                                Minimum Players Needed :
                                <input className="modal__input" type="text" name="minPlayers" id="minPlayers" defaultValue={details.count_min} disabled />
                            </label>
                            <label className="modal__label" htmlFor="maxPlayers">
                                Maximum Players Allowed :
                                <input className="modal__input" type="text" name="maxPlayers" id="maxPlayers" defaultValue={details.count_max} disabled />
                            </label>
                            <label className="modal__label" htmlFor="minAge">
                                Minimum Age Restriction :
                                <input className="modal__input" type="text" name="minAge" id="minAge" defaultValue={details.age_min} disabled />
                            </label>
                            <label className="modal__label" htmlFor="avgPlay">
                                Average Playtime (minutes) :
                                <input className="modal__input" type="text" name="avgPlay" id="avgPlay" defaultValue={details.playtime} disabled />
                            </label>
                            <label className="modal__label modal__label--big" htmlFor="description">
                                Description:
                                <textarea className="modal__textarea" name="description" id="description" defaultValue={details.description} disabled />
                            </label>
                        </div>
                        <div className="modal__actions">
                            <CTA text="Go Back" isButton={true} onClick={clickHandler} />
                            {isOwner
                                ? <CTA text="Delete" isButton={true} isSpecial={true} onClick={handleDelete} />
                                : <CTA text="Contact" isButton={true} isSpecial={true} />
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Modal;