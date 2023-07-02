import background from "../images/main_background.mp4";
import StartButton from "../components/StartButton";
import LeaderButton from "../components/LeaderButton";
import AboutusButton from "../components/AboutusButton";
import logo from '../images/logo.png';
import logo2 from '../images/logo2.png';



const MainMenu = () => {

    return (
        <>
        {/*Calls video background and loops*/}
        <video autoPlay loop muted className="bg-vid">
                <source src={background} type="video/mp4" />
        </video>
        {/*Logo 1 and 2 for main menu */}
        <div className="container">
            <div className="main-opener">
                <img src = {logo} alt = "logo"/>
                <img src = {logo2} alt = "logo2"/>
            </div>
        </div>

        {/*Calls the button section container, but modified to utilize main menu and two buttons */}
        <div className="main-button-section">
            <div className="menu-opener" style={{paddingBottom: '40px'}}>
                <h1 id="about-us-title">Main Menu</h1>
                <StartButton style={{fontSize: '1.2em'}} />
                <LeaderButton style={{fontSize: '1.2em'}} />
                <AboutusButton style={{fontSize: '1.2em'}} />
            </div>
        </div>
        </>
    )

}

export default MainMenu;