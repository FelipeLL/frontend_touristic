import "../style.css";
import Station from "./Station";

const Slider = ({ slider, setSlider, estacion, data }) => {
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
          <Station estacion={estacion} data={data} setSlider={setSlider} />
        </div>
      </div>
    </>
  );
};

export default Slider;
