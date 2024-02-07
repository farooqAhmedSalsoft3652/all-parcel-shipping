import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import './index.css'

const BackButton = (props) => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1) 
  };
  return (
    <button
      className={`backButton ${props.className ? props.className : "" } me-2`}
      onClick={goBack}
    >
      <FontAwesomeIcon icon={faArrowLeft} />
    </button>
  );
};

export default BackButton;
