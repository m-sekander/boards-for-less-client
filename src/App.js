import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import Login from './page/Login/Login';
import Main from './page/Main/Main';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className='content'>
        <NavBar />
        <Routes>
          <Route path="/" element={<Main title="Login" content={<Login />} />} />
          <Route path="/register" element={<Main title="Login" content={<Login />} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;