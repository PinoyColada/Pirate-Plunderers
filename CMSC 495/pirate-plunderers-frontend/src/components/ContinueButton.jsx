import { useNavigate } from "react-router-dom";
import photo from "../images/back_button.png"

// This component is the back button that navigates back to the main menu
const ContinueButton = () => {
    const navigate = useNavigate();

    return (
        <button id="button-container">
            <img className="continue-button" onClick={() => navigate('/')} src={photo} alt="continue button"/>
        </button>
        <button onClick={() => setName('Test')}>Click this</button>
    )
}

export default ContinueButton;