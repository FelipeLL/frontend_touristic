import React, { useState } from "react";
import styles from "../styles/slider.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapLocationDot,
  faBars,
  faEraser,
  faLayerGroup,
  faCamera,
  faHandPointLeft,
} from "@fortawesome/free-solid-svg-icons";

import { optionsAdmin } from "../utilities/optionsAdmin";

const Admin = ({ sliderConfig, setSliderConfig }) => {
  const [siderOn, setSiderOn] = useState(true);

  const [option, setOption] = useState("1");

  return (
    <>
      <div
        className={
          sliderConfig
            ? `${styles.sidebar}`
            : `${styles.sidebar} ${styles.collapse}`
        }
      >
        <div className={`${styles["sidebar-content"]}`}>
          <nav
            className={siderOn ? `${styles.nav} ${styles.close}` : styles.nav}
          >
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

              <span className={styles["logo_name"]}>
                Administrar estaciones
              </span>
            </div>

            <div className={styles["menu-items"]}>
              <ul className={styles["nav-links"]}>
                <li>
                  <Link to="" onClick={() => setOption("1")}>
                    <FontAwesomeIcon
                      icon={faMapLocationDot}
                      className={styles.icons}
                    />
                    <span className={styles["link-name"]}>
                      Agregar estación
                    </span>
                  </Link>
                </li>
                <li className="">
                  <Link to="" onClick={() => setOption("2")}>
                    <FontAwesomeIcon icon={faEraser} className={styles.icons} />
                    <span className={`${styles["link-name"]}`}>
                      Eliminar estación
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="" onClick={() => setOption("3")}>
                    <FontAwesomeIcon
                      icon={faLayerGroup}
                      className={styles.icons}
                    />
                    <span className={styles["link-name"]}>
                      Actualizar estación
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="" onClick={() => setOption("4")}>
                    <FontAwesomeIcon icon={faCamera} className={styles.icons} />
                    <span className={styles["link-name"]}>Subir imagenes</span>
                  </Link>
                </li>
                <li>
                  <Link to="" onClick={() => setSliderConfig(false)}>
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

          <section className={styles.dashboard}>{optionsAdmin(option)}</section>
        </div>
      </div>
    </>
  );
};

export default Admin;
