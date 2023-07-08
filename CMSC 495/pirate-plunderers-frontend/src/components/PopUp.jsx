import logo2 from '../images/logo2.png';
import torch from '../images/torch.gif';
import game_over from "../images/game_over_pic.png"
import MainMenuButton from './MainMenuButton';
import PlayAgainButton from './PlayAgainButton';


// displays the game over section of the game page
const PopUp = (props) => {

    return (
        <>
            <section className="game-page">
                <div className="game-page-title">
                    <img src={torch} alt="logo2" />
                    <img src={logo2} className="game-logo" alt="logo2" />
                    <img src={torch} alt="logo2" />
                </div>
                <div className="game-lost-container">
                    <img style={{ width: '20%', height: '20%', paddingTop: '5%' }} src={game_over} alt="game over" />
                    <h1>GAME OVER</h1>
                    <h3>Your score was {props.score}, {props.name}</h3>
                </div>
                <div style={{ display: 'flex'}}>
                    <PlayAgainButton />
                    <MainMenuButton />
                </div>
            </section>
        </>
    )
}

export default PopUp;