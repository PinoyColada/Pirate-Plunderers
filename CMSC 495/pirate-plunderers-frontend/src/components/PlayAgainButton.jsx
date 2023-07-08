import photo from "../images/play_again_button.png"

// This component is the play again button that refreshes the game page
const PlayAgainButton = () => {

    return (
        <button id="button-container">
            <img className="back-button" onClick={() => window.location.reload()} src={photo} alt="back button"/>
        </button>
    )
}

export default PlayAgainButton;