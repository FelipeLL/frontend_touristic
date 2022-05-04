import img1 from "../images/Ruta4.jpeg";
import img2 from "../images/Ruta5.jpeg";
import img3 from "../images/Ruta6.jpeg";
import img4 from "../images/Ruta7.jpeg";
import img5 from "../images/Ruta8.jpeg";
import img6 from "../images/Ruta9.jpeg";
import img7 from "../images/Ruta10.jpeg";
import img8 from "../images/Ruta11.jpeg";
import img9 from "../images/Ruta12.jpeg";
import img10 from "../images/Ruta13.jpeg";
import styles from "../imagenes.module.css";
import { UserContext } from "../context/UserProvider";
import { useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark } from "@fortawesome/free-solid-svg-icons";
const Station = ({ estacion, data, setSlider }) => {
  const { indications, setIndications } = useContext(UserContext);
  let result = data.filter((item) => item.ID_Estacion === estacion);

  useEffect(() => {
    result.map((item) => console.log(item));
  }, [result]);
  return (
    <>
      {result.map((item) => (
        <div key={item.ID_Estacion}>
          <div className="row">
            <div className="col-10">
              <h3 className="text-center my-4">{item.nombre}</h3>
            </div>
            <div className="col-2 text-center my-2">
              <FontAwesomeIcon
                onClick={() => {
                  setSlider(false);
                }}
                icon={faRectangleXmark}
                style={{ fontSize: "1.0em" }}
              />
            </div>
          </div>

          <div className="container mt-5">
            <p className="fs-6">{item.descripcion}</p>
            <div className={styles["lista-imagenes"]}>
              <img src={img1} alt="Imagen 1" />
              <img src={img2} alt="Imagen 2" />
              <img src={img3} alt="Imagen 3" />
              <img src={img4} alt="Imagen 3" />
              <img src={img5} alt="Imagen 3" />
              <img src={img6} alt="Imagen 3" />
              <img src={img7} alt="Imagen 3" />
              <img src={img8} alt="Imagen 3" />
              <img src={img9} alt="Imagen 3" />
              <img src={img10} alt="Imagen 3" />
            </div>

            <div className={styles["input-box"]}>
              <button
                className={styles.button}
                onClick={() => {
                  setIndications(true);
                }}
              >
                Indicaciones
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Station;
