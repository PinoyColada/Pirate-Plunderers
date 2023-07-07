import { useNavigate } from "react-router-dom";
import photo from "../images/main_menu_button.png"

// This component is the main menu button that navigates back to the main menu
const MainMenuButton = () => {
    const navigate = useNavigate();

    return (
        <button id="button-container">
            <img className="back-button" onClick={() => navigate('/')} src={photo} alt="back button"/>
        </button>
    )
}

export default MainMenuButton;