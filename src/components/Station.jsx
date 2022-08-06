import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/imagenes.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRectangleXmark,
  faCircleXmark,
  faDiamondTurnRight,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserProvider";
import { alertInfo } from "../utilities/Alerts";

const Station = ({ estacion, data, setSlider, setCurrentPosition }) => {
  //en el result se guarda la estación en especifico
  let result = data.filter((item) => item.ID_Estacion === estacion);
  const [imageList, setImageList] = useState([]);
  const { uploadImage, setUploadImage } = useContext(UserContext);
  const { admin } = useContext(UserContext);

  const handleDeleteImage = async (index) => {
    await axios.delete(
      `https://zoratama-map.netlify.app/estaciones/image/${index}`
    );
    setUploadImage(true);
    alertInfo("Imagen eliminada correctamente");
  };

  const handleCurrentPosition = () => {
    const accessPosition = async (position) => {
      setCurrentPosition([position.coords.longitude, position.coords.latitude]);
      const res = await axios.get(
        "https://api.mapbox.com/directions/v5/mapbox/driving/-74.3604375%2C4.3208998%3B-74.353046%2C4.313163?alternatives=true&geometries=geojson&language=es&overview=simplified&steps=true&access_token=pk.eyJ1IjoiamZlbGlwZWxhZGlubyIsImEiOiJjbDFmbHF1dzUwMXo1M2JudDQwNjVoNWw3In0.wiRr4CxecJHGtM18meygeQ"
      );
      console.log(res.data);
    };
    const errorPosition = (err) => {
      console.log("Error obteniendo ubicación: ", err);
    };
    const optionsRequest = {
      enableHighAccuracy: true, // Alta precisión
      maximumAge: 0, // No queremos caché
      timeout: 5000, // Esperar solo 5 segundos
    };
    navigator.geolocation.getCurrentPosition(
      accessPosition,
      errorPosition,
      optionsRequest
    );
  };

  useEffect(() => {
    const axiosData = async () => {
      const URI =
        "https://zoratama-map.netlify.app/estaciones/image/" + estacion;

      const res = await axios.get(URI);

      setImageList(res.data);

      setUploadImage(false);
    };
    axiosData();
  }, [estacion, uploadImage]);

  return (
    <>
      {result.map((item) => (
        <div
          key={item.ID_Estacion}
          style={{ borderBottom: "1px solid #d4d4d4" }}
        >
          <h3 className="text-center my-5 fw-bold">{item.nombre}</h3>

          <FontAwesomeIcon
            onClick={() => {
              setSlider(false);
            }}
            icon={faRectangleXmark}
            className={`${styles.icon}`}
          />

          <div className="container ">
            <div className={styles.mtop}>
              <p className="fs-6">{item.descripcion}</p>
            </div>
          </div>
        </div>
      ))}

      <div className=" mt-3">
        <div
          style={{
            borderBottom: "1px solid #d4d4d4",
            height: "50px",
          }}
        >
          <div className={styles.content}>
            <span>
              <FontAwesomeIcon
                icon={faDiamondTurnRight}
                className={`${styles.indications}`}
              />
            </span>
            <p className={styles["content-text"]}>Indicaciones</p>
          </div>
        </div>
        {admin ? (
          <div className={styles["lista-imagenes"]}>
            {imageList.url &&
              imageList.url.map((url, index) => (
                <div key={imageList.id[index]}>
                  <img key={imageList.id[index]} src={url} alt="Imagen 1" />
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    className={`${styles["icon-img"]}`}
                    onClick={() => handleDeleteImage(imageList.id[index])}
                  />
                </div>
              ))}
          </div>
        ) : (
          <div className={styles["lista-imagenes"]}>
            {imageList.url &&
              imageList.url.map((url, index) => (
                <div key={imageList.id[index]}>
                  <img key={imageList.id[index]} src={url} alt="Imagen 1" />
                </div>
              ))}
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default Station;
