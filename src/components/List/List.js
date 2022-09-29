import './List.scss';
import CTA from '../CTA/CTA';
import axios from 'axios';
import { useState, useEffect } from 'react';

function List() {
    const [categories, setCategories] = useState(null);
    const [foundGame, setFoundGame] = useState(null);
    const [foundCategory, setFoundCategory] = useState(null);
    const [message, setMessage] = useState(null);
    const [isSuccessful, setIsSuccessful] = useState(false);

    const token = localStorage.getItem('token');
    const clientId = process.env.REACT_APP_BG_ATLAS_CLIENT_ID;

    useEffect(() => {
        axios.get(`https://api.boardgameatlas.com/api/game/categories?client_id=${clientId}`)
        .then((result) => {
            setCategories(result.data.categories);
        }).catch((error) => {
            console.log("For devs:", error);
        })
    }, [clientId])

    function initializeDate() {
        const today = new Date();
        let initilizationDate = new Date();
        initilizationDate.setDate(today.getDate() + 8);

        const year = String(initilizationDate.getFullYear());
        let month = String(initilizationDate.getMonth() + 1);
        let day = String(initilizationDate.getDate());

        if (month.length === 1) {
            month = "0" + month;
        }

        if (day.length === 1) {
            day = "0" + day;
        }

        return `${year}-${month}-${day}`;
    }

    function changeHandler(event) {
        setFoundCategory(event.target.value);
    }

    function handleAutofill(event) {
        const name = event.target.value;

        if (!foundGame || name !== foundGame.name) {
            axios.get(`https://api.boardgameatlas.com/api/search?name=${name}&client_id=${clientId}`)
            .then((result) => {
                if (result.data.games.length > 0) {
                    if (name.toLowerCase() === result.data.games[0].name.toLowerCase()) {
                        setFoundGame(result.data.games[0]);
                        if (result.data.games[0].categories.length > 0) {
                            const category = categories.find((item) => {
                                return item.id === result.data.games[0].categories[0].id;
                            })
                            setFoundCategory(category.name);
                        } else {
                            setFoundCategory(null);
                        }
                    }
                }
            }).catch((error) => {
                console.log("For devs:", error);
                setFoundGame(null); 
                setFoundCategory(null); 
            })
        }
    }

    function onReset(event) {
        event.target.reset();
        setFoundGame(null);
        setFoundCategory(null);
        setMessage(null);
        setIsSuccessful(false);
    }

    function onSubmit(event) {
        event.preventDefault();

        axios.post(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/boardgames/`, {
            name: event.target.name.value,
            category: event.target.category.value,
            minPlayers: event.target.minPlayers.value,
            maxPlayers: event.target.maxPlayers.value,
            minAge: event.target.minAge.value,
            avgPlay: event.target.avgPlay.value,
            description: event.target.description.value,
            price: event.target.price.value,
            availableUntil: event.target.availableUntil.value,
        }, {
            headers: {
                authorization: `Bearer: ${token}`
            }
        }).then((result) => {
            setMessage(result.data.message);
            setIsSuccessful(true);

            setTimeout(() => {
                event.target.reset();
                setFoundGame(null);
                setFoundCategory(null);
                setMessage(null);
                setIsSuccessful(false);
            }, 2000);
        }).catch((error) => {
            console.log("For devs:", error);
            setMessage(error.response.data.message);
        })
    }


    if (!categories) {
        return;
    }

    return (
        <div className='list'>
            <h2 className={`list__title ${message ? (isSuccessful ? 'list__title--successful' : 'list__title--error') : ""}`}>{message ? message : "Post your board games here, and share it with the world !"}</h2>
            <form className='list__form' onSubmit={onSubmit} onReset={onReset}>
                <h2 className='list__subtitle'>Board Game Details</h2>
                <div className='list__inputs'>
                    <label className="list__label" htmlFor="name">
                        Board Game Name :
                        <input className="list__input" type="text" name="name" id="name" onBlur={handleAutofill} />
                    </label>
                    <label className="list__label" htmlFor="category">
                        Category :
                        <select className="list__select" name="category" id="category" value={foundCategory ? foundCategory : ""} onChange={changeHandler}>
                            <option className="list__option" value="" disabled>- Please Select -</option>
                            {categories.map((item) => {
                                return (<option key={item.id} className="list__option" value={item.name}>{item.name}</option>)
                            })}
                            <option className="list__option" value="Other">Other</option>
                        </select>
                    </label>
                    <label className="list__label" htmlFor="minPlayers">
                        Minimum Players Needed :
                        <input className="list__input" type="text" name="minPlayers" id="minPlayers" defaultValue={foundGame ? foundGame.min_players : ""} />
                    </label>
                    <label className="list__label" htmlFor="maxPlayers">
                        Maximum Players Allowed :
                        <input className="list__input" type="text" name="maxPlayers" id="maxPlayers" defaultValue={foundGame ? foundGame.max_players : ""} />
                    </label>
                    <label className="list__label" htmlFor="minAge">
                        Minimum Age Restriction :
                        <input className="list__input" type="text" name="minAge" id="minAge" defaultValue={foundGame ? foundGame.min_age : ""} />
                    </label>
                    <label className="list__label" htmlFor="avgPlay">
                        Average Playtime (minutes) :
                        <input className="list__input" type="text" name="avgPlay" id="avgPlay" defaultValue={foundGame ? (Math.round((foundGame.min_playtime + foundGame.max_playtime) / 2)) : ""} />
                    </label>
                    <label className="list__label list__label--big" htmlFor="description">
                        Description:
                        <textarea className="list__textarea" name="description" id="description" defaultValue={foundGame ? foundGame.description_preview.trim() : ""}/>
                    </label>
                </div>
                <h2 className='list__subtitle'>Logistic Details</h2>
                <div className='list__inputs'>
                    <label className="list__label" htmlFor="price">
                        Price / Week (CAD) :
                        <input className="list__input" type="text" name="price" id="price" />
                    </label>
                    <label className="list__label" htmlFor="availableUntil">
                        <div className='list__label-text'>Available Until <span className='list__label-note'>(1 week minimum*)</span> :</div>
                        <input className="list__input" type="date" name="availableUntil" id="availableUntil" defaultValue={initializeDate()} min={initializeDate()} />
                    </label>
                </div>
                <div className='list__actions'>
                    <CTA text="Reset" isButton={true} isSpecial={true} type="Reset" />
                    <CTA text="Submit" isButton={true} />
                </div>
            </form>
        </div>
    )
}

export default List;