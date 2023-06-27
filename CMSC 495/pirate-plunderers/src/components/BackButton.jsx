import { useNavigate } from "react-router-dom";
import photo from "../images/back_button.png"

// This component is the back button that navigates back to the main menu
const BackButton = () => {
    const navigate = useNavigate();

    return (
        <button id="button-container">
            <img className="back-button" onClick={() => navigate('/')} src={photo} alt="back button"/>
        </button>
    )
}

export default BackButton;