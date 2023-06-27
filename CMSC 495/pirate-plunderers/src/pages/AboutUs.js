import background from "../images/about_us_background.mp4";
import BackButton from "../components/BackButton";
import MemberInfo from "../components/MemberInfo";

const AboutUs = () => {

    return (
        <>
            <video autoPlay loop muted className="bg-vid">
                <source src={background} type="video/mp4" />
            </video>
            <div className="container">
                <div className="main-content-top">
                    <h1>Meet the team</h1>
                </div>

                <div className="main-content-bottom">
                    <div className="section-container">
                        <MemberInfo name="Ryan" role="Team Lead"/>
                        <MemberInfo name="Ben" role="Software Developer"/>
                        <MemberInfo name="Tyler" role="Software Developer"/>
                        <MemberInfo name="Angelo" role="Software Developer"/>
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