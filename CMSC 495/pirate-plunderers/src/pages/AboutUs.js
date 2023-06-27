import background from "../images/about_us_background.mp4";
import BackButton from "../components/BackButton";
import MemberInfo from "../components/MemberInfo";
import ryan from "../images/ryan_pic.png";
import benjamin from "../images/benjamin_pic.png";
import tyler from "../images/tyler_pic.png";
import angelo from "../images/angelo_pic.png";

const AboutUs = () => {

    return (
        <>
            <video autoPlay loop muted className="bg-vid">
                <source src={background} type="video/mp4" />
            </video>
            <div className="container">
                <div className="main-content-top">
                    <h1 id="about-us-title">Meet the team</h1>
                </div>

                <div className="main-content-bottom">
                    <div className="section-container">
                        <MemberInfo name="Ryan Hatamosa"
                         role="Team Lead"
                         image={ryan}
                         />
                        <MemberInfo name="Benjamin Kim" 
                        role="Software Developer"
                        image={benjamin}
                        />
                        <MemberInfo name="Tyler Spring" 
                        role="Software Developer"
                        image={tyler}
                        />
                        <MemberInfo name="Angelo Wheeler" 
                        role="Software Developer"
                        image={angelo}
                        />
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

export default AboutUs;