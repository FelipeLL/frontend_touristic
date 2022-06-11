import styles from "../styles/imagenes.module.css";
import { UserContext } from "../context/UserProvider";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import img1 from "../images/g2.jpg";
const Station = ({ estacion, data, setSlider }) => {
  //en el result se guarda la estación en especifico
  let result = data.filter((item) => item.ID_Estacion === estacion);
  const [imageList, setImageList] = useState([]);
  const { uploadImage, setUploadImage } = useContext(UserContext);
  /* useEffect(() => {
    const axiosData = async () => {
      // console.log(estacion);

      const URI = "http://localhost:5000/estaciones/image/" + estacion;
      const res = await axios.get(URI);
      // console.log(Object.keys(res.data));
      setImageList(res.data);

      // console.log(imageList);
      setUploadImage(false);
    };
    axiosData();
  }, [estacion, uploadImage]); */

  useEffect(() => {
    const axiosData = async () => {
      const URI = "http://localhost:5000/estaciones/image/" + estacion;

      const res = await axios.get(URI);

      setImageList(res.data);

      // setUploadImage(false);
    };
    axiosData();
  }, [estacion]);

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
                icon={faRectangleXmark}
                className={`${styles.indications}`}
              />
            </span>
            <p className={styles["content-text"]}>Indicaciones</p>
          </div>
        </div>

        <div className={styles["lista-imagenes"]}>
          {imageList &&
            imageList.map((image, index) => (
              <img key={index} src={image} alt="Imagen 1" />
            ))}
          {/*  {imageList.map((image, index) => (
            <h3 key={index}>{image}</h3>
          ))} */}
        </div>
      </div>
    </>
  );
};

export default Station;
