import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <BrowserRouter>
      <main className="main">
        <Header />
        <NavBar />
      </main>
    </BrowserRouter>
  );
}

export default App;