import './Main.scss';
import dice from '../../assets/images/dice.svg';
import playingCards from '../../assets/images/playing-cards.svg';

function Main({title, content}) {
    return (
        <main className='main'>
            <h1 className='main__title'>{title}</h1>
            <div className='main__content'>
                <img className="main__icon main__icon-dice" src={dice} alt="" />
                <img className="main__icon main__icon-cards" src={playingCards} alt="" />
                {content}
                <img className="main__icon main__icon-dice--bottom" src={dice} alt="" />
                <img className="main__icon main__icon-cards--bottom" src={playingCards} alt="" />
            </div>
        </main>
    )
}

export default Main;