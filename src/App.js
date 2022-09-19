import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';

function App() {
  return (
    <BrowserRouter>
      <main className="main">
        <Header />
      </main>
    </BrowserRouter>
  );
}

export default App;