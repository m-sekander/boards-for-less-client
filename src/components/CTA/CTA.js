import './CTA.scss';
import {Link} from 'react-router-dom';

function CTA({ text, isButton, link, isSpecial, onClick, type }) {
    // Returns button if isButton prop is true else returns link
    if (isButton) {
        return (
            <button className={`cta ${isSpecial && "cta--special"}` } onClick={onClick} type={type ? type : ""}>
                {text}
            </button>
        );
    } else {
        return (
            <Link to={link} className={`cta ${isSpecial && "cta--special"}` } onClick={onClick}>
                {text}
            </Link>
        );
    }
}

export default CTA;