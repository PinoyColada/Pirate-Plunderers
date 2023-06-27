import { FaGithub, FaLinkedin } from 'react-icons/fa6';

const MemberInfo = (props) => {
    return (
        <div id="profile-section">
            <img src={props.image} alt={`${props.image} headshot`} />
            <h3>{props.name}</h3>
            <h4>{props.role}</h4>
            <div id='buttons-container'>
                <FaGithub size='2rem' />
                <FaLinkedin size='2rem' />
            </div>
        </div>
    )
}

export default MemberInfo;