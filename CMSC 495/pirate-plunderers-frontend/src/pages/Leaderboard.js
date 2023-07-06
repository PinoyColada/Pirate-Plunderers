import { useState, useEffect} from 'react'
import background from "../images/leaderboard_background.mp4";
import BackButton from "../components/BackButton";



const Leaderboard = () => {

    const [data, setData] = useState([{}])

    // calls the "get_score" route from the back-end
    // and stores it in the "data" state
    useEffect(() => {
        fetch("https://pirate-plunderers-backend.onrender.com/get_score").then(
            res => res.json()
        ).then(
            data => {
                setData(data)
            }
        )
    },[])

    function createNums(n) {
        let nums = [];
        for (let i = 1; i <= n; i++) {
            nums.push(<p className="table-content">{i}</p>);
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
                        <h4 className="column-container">
                            <u>Ranking</u>
                            {createNums(10)}
                        </h4>
                        <h4 className="column-container">
                            <u>Name</u>
                            {data.map(user => {
                                return <p className="table-content">{user.Player}</p>;
                            })}
                        </h4>
                        
                        <h4 className="column-container">
                            <u>Score</u>
                            {data.map(user => {
                                return <p className="table-content">{user.Score}</p>;
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