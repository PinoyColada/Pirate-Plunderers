import { useNavigate } from "react-router-dom";
import photo from "../images/leaderboard_button.png"

// This component is the leader board button that navigates to the leaderboard page
const LeaderButton = () => {
    const navigate = useNavigate();

    return (
        <button id="button-container" style={{width: '700px', height: '50px', padding: '40px'}}>
            <img className="back-button" onClick={() => navigate('/leaderBoard')} src={photo} alt="Leaderboard button"/>
        </button>
    )
}

export default LeaderButton;