import './CTA.scss';
import {Link} from 'react-router-dom';

function CTA({icon, text, isButton, link, isSpecial, onClick}) {
    // Returns button if isButton prop is true else returns link
    if (isButton) {
        return (
            <button className={`cta ${isSpecial && "cta--special"}` } onClick={onClick}>
                <img className="cta__icon" src={icon} alt=""/>
                {text}
            </button>
        );
    } else {
        return (
            <Link to={link} className={`cta ${isSpecial && "cta--special"}` } onClick={onClick}>
                <img className="cta__icon" src={icon} alt=""/>
                {text}
            </Link>
        );
    }
}

export default CTA;