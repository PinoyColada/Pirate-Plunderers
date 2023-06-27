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
                    <h1 id="about-us-title">Meet "the bro-grammers" team</h1>
                </div>

                <div className="main-content-bottom">
                    <div className="section-container">
                        <MemberInfo name="Ryan Hatamosa"
                         role="Team Lead"
                         image={ryan}
                         github="https://github.com/PinoyColada"
                         linkedin="https://www.linkedin.com/in/ryan-hatamosa/"
                         />
                        <MemberInfo name="Benjamin Kim" 
                        role="Software Developer"
                        image={benjamin}
                        github="https://github.com/benjaminjkim88"
                        linkedin="https://www.linkedin.com/in/benkim88/"
                        />
                        <MemberInfo name="Tyler Spring" 
                        role="Software Developer"
                        image={tyler}
                        github="https://github.com/TGSpring"
                        linkedin="https://www.linkedin.com/in/tyler-spring-6a7099143/"
                        />
                        <MemberInfo name="Angelo Wheeler" 
                        role="Software Developer"
                        image={angelo}
                        github="https://github.com/xAngelo123"
                        linkedin="https://www.linkedin.com/in/angelo-wheeler-6bb148b7/"
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