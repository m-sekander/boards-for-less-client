import './GameCard.scss';
import { Link } from 'react-router-dom';

function GameCard({ isOwner, name, shortAddress, matchLabel, priceWeekly, availableUntil }) {
    if (isOwner) {
        return (
            <div className="game-card">
                <div className="game-card__details">
                    <span className="game-card__listing-name">{name}</span>
                    <span className="game-card__listing-logistics">Price Weekly: ${priceWeekly}</span>
                    <span className="game-card__listing-logistics">Available Until: {availableUntil}</span>
                </div>
                <Link className="game-card__action" to="/">More Details</Link>
            </div>
        )
    }

    return (
        <div className="game-card">
            <div className="game-card__details">
                <span className="game-card__listing-name">{name}</span>
                <span className="game-card__listing-address">{matchLabel(shortAddress)}{`) ${shortAddress}`}</span>
            </div>
            <Link className="game-card__action" to="/">More Details</Link>
        </div>
    )
}

export default GameCard;