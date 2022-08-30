import styles from "../styles/profile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faBars,
  faKey,
  faLayerGroup,
  faUser,
  faHandPointLeft,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { optionsProfile } from "../utilities/optionsProfile";

const Profile = ({ sliderProfile, setSliderProfile }) => {
  const [siderOn, setSiderOn] = useState(true);
  const [option, setOption] = useState("1");

  return (
    <div
      className={
        sliderProfile
          ? `${styles.sidebar}`
          : `${styles.sidebar} ${styles.collapse}`
      }
    >
      <div className={`${styles["sidebar-content"]}`}>
        <nav className={siderOn ? `${styles.nav} ${styles.close}` : styles.nav}>
          <div className={styles["logo-name"]}>
            <div
              className={styles["logo-image"]}
              onClick={() => {
                setSiderOn(!siderOn);
              }}
            >
              <FontAwesomeIcon
                icon={faBars}
                /* style={{ fontSize: "27px", color: "#1a1a1a" }} */
                className={styles["icon-menu"]}
              />
            </div>

            <span className={styles["logo_name"]}>Perfil</span>
          </div>

          <div className={styles["menu-items"]}>
            <ul
              className={
                siderOn
                  ? `${styles["nav-links"]} ${styles.close}`
                  : styles["nav-links"]
              }
            >
              <li>
                <Link to="" onClick={() => setOption("1")}>
                  <FontAwesomeIcon icon={faUser} className={styles.icons} />
                  <span className={styles["link-name"]}>Ver perfil</span>
                </Link>
              </li>
              <li className="">
                <Link to="" onClick={() => setOption("2")}>
                  <FontAwesomeIcon
                    icon={faAddressCard}
                    className={styles.icons}
                  />
                  <span className={`${styles["link-name"]}`}>
                    Actualizar información
                  </span>
                </Link>
              </li>
              <li>
                <Link to="" onClick={() => setOption("3")}>
                  <FontAwesomeIcon icon={faKey} className={styles.icons} />
                  <span className={styles["link-name"]}>
                    Actualizar contraseña
                  </span>
                </Link>
              </li>
              <li>
                <Link to="" onClick={() => setSliderProfile(false)}>
                  <FontAwesomeIcon
                    icon={faHandPointLeft}
                    className={styles.icons}
                  />
                  <span className={styles["link-name"]}>Devolverse</span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <section className={styles.dashboard}>{optionsProfile(option)}</section>
      </div>
    </div>
  );
};

export default Profile;
