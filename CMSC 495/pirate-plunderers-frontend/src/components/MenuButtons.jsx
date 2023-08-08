import { useNavigate } from "react-router-dom";

// This component is the about us button that navigates to the about us page
const MenuButtons = (props) => {
    const navigate = useNavigate();

    return (
        <button id="button-container" style={{width: '700px', height: '50px',padding: '40px', paddingBottom: "80px"}}>
            <img className="back-button" onClick={() => navigate(props.nav)} src={props.img} alt={props.alt}/>
        </button>
    )
}

export default MenuButtons;