import './App.css';
import { Routes, Route } from 'react-router-dom'
import Game from './pages/Game'
import MainMenu from './pages/MainMenu';
import AboutUs from './pages/AboutUs';
import Leaderboard from './pages/Leaderboard';

// urls to specific pages based after your localhost number
// ex.) http://localhost:3000/ will bring you to the main menu
// ex.) http://localhost:3000/game will bring you to the game itself
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<MainMenu />} />
        <Route path='/game' element={<Game />} />
        <Route path='/aboutUs' element={<AboutUs />} />
        <Route path='/leaderBoard' element={<Leaderboard />} />
      </Routes>
    </div>
    
  );
}

export default App;
