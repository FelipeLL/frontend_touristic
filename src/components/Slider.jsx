import styles from "../styles/station.module.css";
import Station from "./Station";

const Slider = ({ slider, setSlider, estacion, data, setCurrentPosition }) => {
  return (
    <>
      <div
        className={
          slider ? `${styles.sidebar}` : `${styles.sidebar} ${styles.collapse}`
        }
      >
        <div className={`${styles["sidebar-content"]}`}>
          <div className={styles.dashboard}>
            <Station
              estacion={estacion}
              data={data}
              setSlider={setSlider}
              setCurrentPosition={setCurrentPosition}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Slider;
