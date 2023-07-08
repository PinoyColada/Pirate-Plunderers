import { useState, useEffect} from 'react'
import background from "../images/leaderboard_background.mp4";
import BackButton from "../components/BackButton";



const Leaderboard = () => {

    // define state variable
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

    // generates numbers on the table content page
    function createNums(n) {
        let nums = [];
        for (let i = 1; i <= n; i++) {
            nums.push(<p className="table-content">{i}</p>);
        }
        return nums;
    }


    return (
        <>
            {/*Calls video background and loops*/}
            <video autoPlay loop muted className="bg-vid">
                <source src={background} type="video/mp4" />
            </video>
            <div className="container">
                <div className="main-content-top">
                    <h1 id="leaderboard-title">Leaderboard</h1>
                </div>

                <div className="main-content-bottom">
                    <div className="section-container">
                        {/*Calls the createnums functions*/}
                        <h4 className="column-container">
                            <u>Ranking</u>
                            {createNums(10)}
                        </h4>
                        {/*Maps through player and returns them on the page*/}
                        <h4 className="column-container">
                            <u>Name</u>
                            {data.map(user => {
                                return <p className="table-content">{user.Player}</p>;
                            })}
                        </h4>
                        {/*Maps through score and returns them on the page*/}
                        <h4 className="column-container">
                            <u>Score</u>
                            {data.map(user => {
                                return <p className="table-content">{user.Score}</p>;
                            })}
                        </h4>
                    </div>
                </div>
                {/*Calls back button component to navigate the user back the to main menu*/}
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