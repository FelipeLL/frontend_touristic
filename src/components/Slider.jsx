import { useState } from "react";
// import "../style.css";
import imagen1 from "../images/g2.jpg";

const Slider = ({ slider }) => {
  return (
    <>
      <div
        id="left"
        className={
          slider
            ? "sidebar flex-center left "
            : "sidebar flex-center left collapsed"
        }
      >
        <div className="sidebar-content rounded-rect flex-center">
          Left Sidebar
          <img src={imagen1} alt="" />
          <div className="sidebar-toggle rounded-rect left">&rarr;</div>
        </div>
      </div>
    </>
  );
};

export default Slider;
