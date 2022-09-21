import './Main.scss';

function Main({title, content}) {
    return (
        <main className='main'>
            <h1 className='main__title'>{title}</h1>
            <div className='main__content'>
                {content}
            </div>
        </main>
    )
}

export default Main;