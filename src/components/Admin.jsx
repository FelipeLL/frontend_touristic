import React, { useState } from "react";
import "../style.css";
import Navbar from "./Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
const Admin = () => {
  const [active, setActive] = useState(false);

  const activeSlider = () => {
    setActive(true);
  };
  return (
    <>
      <div
        id="right"
        className={
          active
            ? "sidebar flex-center right "
            : "sidebar flex-center right collapsed"
        }
      >
        <div className="sidebar-content rounded-rect  ">
          <Navbar active={active} setActive={setActive} />

          <div
            className="sidebar-toggle rounded-rect right "
            onClick={activeSlider}
          >
            <FontAwesomeIcon icon={faGear} style={{ color: "#46afff" }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
