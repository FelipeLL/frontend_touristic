import "../style.css";
import Station from "./Station";

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
        <div className="sidebar-content rounded-rect ">
          <Station />
        </div>
      </div>
    </>
  );
};

export default Slider;
