import { useNavigate } from "react-router-dom";
import photo from "../images/about_us_button.png"

// This component is the back button that navigates back to the main menu
const AboutusButton = () => {
    const navigate = useNavigate();

    return (
        <button id="button-container" style={{width: '700px', height: '50px',padding: '40px', paddingBottom: "80px"}}>
            <img className="back-button" onClick={() => navigate('/aboutUs')} src={photo} alt="about us button"/>
        </button>
    )
}

export default AboutusButton;