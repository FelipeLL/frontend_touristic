import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import styles from "../logout.module.css";
import axios from "axios";

const Logout = () => {
  const cerrar = async () => {
    const URI = "https://zoratamamap.herokuapp.com/auth/logout";
    const res = await axios.get(URI);
    // res && navigate("/register");
  };

  return (
    <div>
      <a className={styles["rounded-boton"]} onClick={cerrar} href="/">
        <FontAwesomeIcon
          icon={faArrowRightToBracket}
          style={{ color: "#333" }}
        />
      </a>
    </div>
  );
};

export default Logout;
