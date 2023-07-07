import photo from "../images/play_again_button.png"

// This component is the main menu button that navigates back to the main menu
const PlayAgainButton = () => {

    return (
        <button id="button-container">
            <img className="back-button" onClick={() => window.location.reload()} src={photo} alt="back button"/>
        </button>
    )
}

export default PlayAgainButton;