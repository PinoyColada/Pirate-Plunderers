import { useNavigate } from "react-router-dom";

const BackButton = () => {
    const navigate = useNavigate();

    return (
        <button id="button-container" onClick={() => navigate('/')}>
            Back
        </button>
    )
}

export default BackButton;