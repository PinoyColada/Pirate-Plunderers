import { useNavigate } from "react-router-dom";
import photo from "../images/back_button.png"

const BackButton = () => {
    const navigate = useNavigate();

    return (
        <button id="button-container">
            <img className="back-button" onClick={() => navigate('/')} src={photo} alt="back button"/>
        </button>
    )
}

export default BackButton;