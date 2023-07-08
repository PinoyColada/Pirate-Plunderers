import { useNavigate } from "react-router-dom";
import photo from "../images/start_game_button.png"

// This component is the start button that navigates to the game page
const StartButton = () => {
    const navigate = useNavigate();

    return (
        <button id="button-container" style={{width: '700px', height: '50px', padding: '40px'}}>
            <img className="back-button" onClick={() => navigate('/game')} src={photo} alt="start button"/>
        </button>
    )
}

export default StartButton;