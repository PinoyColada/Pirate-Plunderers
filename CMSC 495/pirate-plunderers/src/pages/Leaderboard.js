import background from "../images/leaderboard_background.mp4";
import BackButton from "../components/BackButton";



const Leaderboard = () => {

    // placeholders till backend is ready to fetch information from
    const names = ["Batman", "Daredevil", "Hawkeye", "Superman", "Thor",
        "Robin", "Wolverine", "Aquaman", "Hulk", "Vision"];

    const scores = [5200, 4000, 2700, 2400, 2000,
        1500, 1400, 1000, 650, 200];

    function createNums(n) {
        let nums = [];
        for (let i = 0; i < n; i++) {
            nums.push(<p>{i}</p>);
        }
        return nums;
    }


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
                    <div className="section-container">
                        <h4 className="column-container section-header">
                            Ranking
                            {createNums(10)}
                        </h4>
                        <h4 className="column-container section-header">
                            Name
                            {names.map(name => {
                                return <p>{name}</p>;
                            })}
                        </h4>

                        <h4 className="column-container section-header">
                            Score
                            {scores.map(score => {
                                return <p>{score}</p>;
                            })}
                        </h4>
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