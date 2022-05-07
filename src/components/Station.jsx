import styles from "../imagenes.module.css";
import { UserContext } from "../context/UserProvider";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
const Station = ({ estacion, data, setSlider }) => {
  const { indications, setIndications } = useContext(UserContext);
  let result = data.filter((item) => item.ID_Estacion === estacion);
  const [imageList, setImageList] = useState(null);
  const { uploadImage, setUploadImage } = useContext(UserContext);
  useEffect(() => {
    const axiosData = async () => {
      const URI = "http://localhost:5000/estaciones/image/" + estacion;
      const res = await axios.get(URI);
      setImageList(res.data);
      setUploadImage(false);
      console.log("1");
    };
    axiosData();
  }, [estacion, uploadImage]);

  /* useEffect(() => {
    const axiosData = async () => {
      const URI = "http://localhost:5000/estaciones/image/" + estacion;
      const res = await axios.get(URI);
      setImageList(res.data);
      console.log(uploadImage);
      console.log("1");
      setUploadImage(false);
    };
    axiosData();
  }, [uploadImage]); */

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

          <div className="container ">
            <div className={styles.mtop}>
              <p className="fs-6">{item.descripcion}</p>
            </div>
          </div>
        </div>
      ))}
      <div className="container">
        <div className={styles["lista-imagenes"]}>
          {/* {imageList &&
            imageList.map((image) => (
              <img key={image} src={image.name} alt="Imagen 1" />
            ))} */}
          {imageList &&
            imageList.map((image) => (
              <img
                key={image}
                src={`http://localhost:5000/${estacion}/` + image}
                alt="Imagen 1"
              />
            ))}
        </div>

        {/* <div className={styles["input-box"]}>
          <button
            className={styles.button}
            onClick={() => {
              setIndications(true);
            }}
          >
            Indicaciones
          </button>
        </div> */}
      </div>
    </>
  );
};

export default Station;
