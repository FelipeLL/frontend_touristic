import React, { useEffect, useState } from "react";
import styles from "../Navbar.module.css";
import AddStation from "./AddStation";
import DeleteStation from "./DeleteStation";
import UpdateStation from "./UpdateStation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

const Navbar = ({ active, setActive }) => {
  const [addStation, setAddStation] = useState(true);
  const [deleteStation, setDeleteStation] = useState(false);
  const [updateStation, setUpdateStation] = useState(false);

  const viewAddStation = () => {
    setAddStation(true);
    setDeleteStation(false);
    setUpdateStation(false);
  };
  const viewDeleteStation = () => {
    setAddStation(false);
    setDeleteStation(true);
    setUpdateStation(false);
  };
  const viewUpdateStation = () => {
    setAddStation(false);
    setDeleteStation(false);
    setUpdateStation(true);
  };
  const closeWindow = () => {
    setActive(false);
  };

  return (
    <>
      <nav className={styles.navigator}>
        <a href="#" onClick={viewAddStation} className={styles.a}>
          Agregar
        </a>
        <a href="#" onClick={viewDeleteStation} className={styles.a}>
          Eliminar
        </a>
        <a href="#" onClick={viewUpdateStation} className={styles.a}>
          Actualizar
        </a>
        <a href="#" onClick={closeWindow} className={styles.cerrar}>
          <FontAwesomeIcon icon={faCircleXmark} style={{ fontSize: "1.5em" }} />
        </a>
      </nav>

      {addStation && <AddStation />}
      {deleteStation && <DeleteStation />}
      {updateStation && <UpdateStation />}
    </>
  );
};

export default Navbar;
