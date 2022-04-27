import { useState } from "react";
import "../style.css";

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
          <div className="sidebar-toggle rounded-rect left">&rarr;</div>
        </div>
      </div>
    </>
  );
};

export default Slider;
