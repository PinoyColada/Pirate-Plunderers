import background from "../images/leaderboard_background.mp4";
import BackButton from "../components/BackButton";

const Leaderboard = () => {

    return (
        <>
            <video autoPlay loop muted className="bg-vid">
                <source src={background} type="video/mp4" />
            </video>
            <div className="container">
                <div className="main-content-top">
                    <h1 id="leaderboard-title">Leaderboard</h1>

                </div>

                <div className="main-content-bottom">
                    <div className="tabs-container">
                        <h4>Ranking</h4>
                        <h4>Name</h4>
                        <h4>Score</h4>
                    </div>
                </div>
                <div className="button-section">
                    <div>
                        <BackButton />
                    </div>
                </div>
            </div>

        </>
    )

}

export default Leaderboard;