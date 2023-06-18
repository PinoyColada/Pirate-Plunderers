import './App.css';
import { Routes, Route } from 'react-router-dom'
import Game from './pages/Game'
import MainMenu from './pages/MainMenu';
import AboutUs from './pages/AboutUs';
import Leaderboard from './pages/Leaderboard';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<MainMenu />} />
        <Route path='/game' element={<Game />} />
        <Route path='/aboutUs' element={<AboutUs />} />
        <Route path='/leaderBoard' element={<Leaderboard />} />
      </Routes>
      <Game/>
    </div>
    
  );
}

export default App;
