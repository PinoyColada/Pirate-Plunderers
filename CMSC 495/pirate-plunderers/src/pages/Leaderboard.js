import background from "../images/leaderboard_background.mp4";

const Leaderboard = () => {

    return (

        <div>
            <video autoPlay loop muted className="bg-vid">
                <source src={background} type="video/mp4" />
            </video>
        </div>
    )

}

export default Leaderboard;