import img1 from "../images/r1.jpg";
import img2 from "../images/g2.jpg";
import img3 from "../images/g3.jpg";
import styles from "../imagenes.module.css";

const Station = () => {
  return (
    <>
      <h3 className="text-center my-4">Estación</h3>
      <div className="container mt-5">
        <p className="fs-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus harum
          praesentium suscipit at fugiat esse! Laborum rerum, harum est dolorem
          consectetur repellat vitae nobis quo molestiae id officia asperiores
          labore.
        </p>
        <div className={styles["lista-imagenes"]}>
          <img src={img1} alt="Imagen 1" />
          <img src={img2} alt="Imagen 2" />
          <img src={img3} alt="Imagen 3" />
        </div>

        <div className={styles["input-box"]}>
          <button className={styles.button}>Indicaciones</button>
        </div>
      </div>
    </>
  );
};

export default Station;
