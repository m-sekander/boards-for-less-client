import './GameCard.scss';
import { useState } from 'react';
import Modal from '../Modal/Modal';
import { computeDistanceBetween } from 'spherical-geometry-js';

function GameCard({ isOwner, ownerEmail, id, name, shortAddress, matchLabel, priceWeekly, availableUntil, setContentExpansion, destination, origin }) {
    const [modalActive, setModalActive] = useState(false);

    function clickHandler() {
        setContentExpansion(true);
        setModalActive(true);

        if (!isOwner) {
            window.scroll({
                top: 200,
                right: 0,
                behavior: 'smooth'
            });
        }
    }

    function calcDistance() {
        const destinationArr = destination.split(",");
        const destinationFormatted = {lat: Number(destinationArr[0]), lng: Number(destinationArr[1])};
        return `${Math.round(computeDistanceBetween(origin, destinationFormatted)/100)/10}km`;
    }


    if (isOwner) {
        return (
            <div className="game-card">
                <div className="game-card__details">
                    <span className="game-card__listing-name">{name}</span>
                    <span className="game-card__listing-logistics">Price Weekly: ${priceWeekly}</span>
                    <span className="game-card__listing-logistics">Available Until: {availableUntil}</span>
                </div>
                <button className="game-card__action" onClick={clickHandler}>More Details</button>
                {modalActive && <Modal boardgameId={id} boardgameName={name} isOwner={isOwner} setModalActive={setModalActive} setContentExpansion={setContentExpansion} />}
            </div>
        )
    }
    
    return (
        <div className="game-card">
            <div className="game-card__details">
                <span className="game-card__listing-name">{name}</span>
                <span className="game-card__listing-address">{shortAddress}</span>
                <div>
                    <span className="game-card__listing-marker">{`Marker ${matchLabel(shortAddress)}`}</span>
                    <span className="game-card__listing-logistics"> - </span>
                    <span className="game-card__listing-distance">{`${calcDistance()}`}</span>
                </div>
            </div>
            <button className="game-card__action" onClick={clickHandler}>More Details</button>
                {modalActive && <Modal boardgameId={id} boardgameName={name} setModalActive={setModalActive} setContentExpansion={setContentExpansion} ownerEmail={ownerEmail} />}
        </div>
    )
}

export default GameCard;