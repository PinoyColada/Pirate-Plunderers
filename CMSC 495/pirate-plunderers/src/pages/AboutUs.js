import background from "../images/about_us_background.mp4";

const AboutUs = () => {

    return (
        <div>
            <video autoPlay loop muted className="bg-vid">
                <source src={background} type="video/mp4" />
            </video>
        </div>
    )

}

export default AboutUs;