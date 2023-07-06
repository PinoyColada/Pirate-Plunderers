import { FaGithub, FaLinkedin } from 'react-icons/fa6';

// This component creates a profile section where you can pass an image,
// name, role, github, and link value
const MemberInfo = (props) => {
    return (
        <div id="profile-section">
            <img src={props.image} alt={`${props.image} headshot`} />
            <h3>{props.name}</h3>
            <h4>{props.role}</h4>
            <div id='buttons-container'>
                <a href={props.github} rel="noreferrer" target="_blank">
                    <FaGithub className="button-icon" size='2rem' />
                </a>
                <a href={props.linkedin} rel="noreferrer" target="_blank">
                    <FaLinkedin className="button-icon" size='2rem' />
                </a>
            </div>
        </div>
    )
}

export default MemberInfo;