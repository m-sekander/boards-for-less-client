import './GameCard.scss';
import { useState } from 'react';
import Modal from '../Modal/Modal';

function GameCard({ isOwner, ownerEmail, id, name, shortAddress, matchLabel, priceWeekly, availableUntil, setContentExpansion }) {
    const [modalActive, setModalActive] = useState(false);

    function clickHandler() {
        setContentExpansion(true);
        setModalActive(true);
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
                <span className="game-card__listing-address">{matchLabel(shortAddress)}{`) ${shortAddress}`}</span>
            </div>
            <button className="game-card__action" onClick={clickHandler}>More Details</button>
                {modalActive && <Modal boardgameId={id} boardgameName={name} setModalActive={setModalActive} setContentExpansion={setContentExpansion} ownerEmail={ownerEmail} />}
        </div>
    )
}

export default GameCard;