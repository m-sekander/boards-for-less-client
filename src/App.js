import './App.scss';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import Login from './components/Login/Login';
import Main from './page/Main/Main';
import Register from './components/Register/Register';
import Home from './components/Home/Home';
import List from './components/List/List';
import Rent from './components/Rent/Rent';
import { useLoadScript } from '@react-google-maps/api';
import Account from './components/Account/Account';


function App() {
  const isLoggedIn = localStorage.getItem('token');
  const [libraries] = useState(["places"]);

  // initializing Google Maps Platform API
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
    region: "CA",
    libraries
  });

  if (!isLoaded) {
    return
  }
  
  return (
    <BrowserRouter>
      <Header isLoggedIn={isLoggedIn} />
      <div className='content'>
        <NavBar isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/" element={isLoggedIn ? <Main title="Home" content={<Home />} /> : <Navigate to="/login" />} />
          <Route path="/login" element={!isLoggedIn ? <Main title="Login" content={<Login />} /> : <Navigate to="/" />} />
          <Route path="/register" element={!isLoggedIn ? <Main title="Register" content={<Register />} /> : <Navigate to="/" />} />
          <Route path="/account" element={isLoggedIn ? <Main title="My Account" content={<Account />} /> : <Navigate to="/login" />} />
          <Route path="/list" element={isLoggedIn ? <Main title="List Board Game" content={<List />} /> : <Navigate to="/login" />} />
          <Route path="/rent" element={isLoggedIn ? <Main title="Rent Board Game" content={<Rent />} /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;