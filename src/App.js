import './App.scss';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import Login from './components/Login/Login';
import Main from './page/Main/Main';
import Register from './components/Register/Register';
import Home from './components/Home/Home';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token'));

  return (
    <BrowserRouter>
      <Header isLoggedIn={isLoggedIn} />
      <div className='content'>
        <NavBar isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/" element={isLoggedIn ? <Main title="Home" content={<Home />} /> : <Navigate to="/login" />} />
          <Route path="/login" element={!isLoggedIn ? <Main title="Login" content={<Login />} /> : <Navigate to="/" />} />
          <Route path="/register" element={!isLoggedIn ? <Main title="Register" content={<Register />} /> : <Navigate to="/" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;