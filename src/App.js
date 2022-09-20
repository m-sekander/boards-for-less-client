import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import Login from './page/Login/Login';

function App() {
  return (
    <BrowserRouter>
        <Header />
        <main className='main'>
          <NavBar />
        </main>
    </BrowserRouter>
  );
}

export default App;