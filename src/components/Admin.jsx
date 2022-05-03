import React, { useState } from "react";
import "../style.css";
import Navbar from "./Navbar";
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
            &larr;
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
