import './CTA.scss';
import {Link} from 'react-router-dom';

function CTA({icon, text, isButton, link, isSpecial}) {
    // Returns button if isButton prop is true else returns link
    if (isButton) {
        if (isSpecial) {
            return (
                <button className="cta cta--special">
                    {text}
                </button>
            );
        } else {
            return (
                <button className="cta">
                    <img className="cta__icon" src={icon} alt=""/>
                    {text}
                </button>
            );
        }
    } else {
        return (
            <Link to={link} className="cta">
                <img className="cta__icon" src={icon} alt=""/>
                {text}
            </Link>
        );
    }
}

export default CTA;