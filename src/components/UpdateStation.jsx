import React from "react";
import { useState, useEffect, useContext } from "react";
import styles from "../updateStation.module.css";
import axios from "axios";
import { UserContext } from "../context/UserProvider";

const UpdateStation = () => {
  const { upload, setUpload } = useContext(UserContext);
  const [file, setFile] = useState(null);
  const { uploadImage, setUploadImage } = useContext(UserContext);
  useEffect(() => {
    const axiosData = async () => {
      const URI = "https://zoratamamap.herokuapp.com/estaciones";
      const res = await axios.get(URI);
      setData(res.data);
    };
    axiosData();
  }, [upload]);

  const [data, setData] = useState([]);

  const [estaciones, setEstaciones] = useState({
    estacion: "Seleccionar estación",
    nombre: "",
    longitud: "",
    latitud: "",
    descripcion: "",
  });
  const { estacion } = estaciones;

  useEffect(() => {
    const dataEstacion = data.filter(
      (item) => item.ID_Estacion === Number(estacion)
    );
    if (dataEstacion.length) {
      const datos = {
        estacion: estacion,
        nombre: dataEstacion[0].nombre,
        longitud: dataEstacion[0].longitud,
        latitud: dataEstacion[0].latitud,
        descripcion: dataEstacion[0].descripcion,
      };

      setEstaciones(datos);
    } else {
      setEstaciones({
        estacion: "Seleccionar estación",
        nombre: "",
        longitud: "",
        latitud: "",
        descripcion: "",
      });
    }
  }, [estacion]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (estacion === "Seleccionar estación") {
      console.log("Complete todos los campos");
      return;
    }

    const res = await axios.put(
      `https://zoratamamap.herokuapp.com/estaciones/${estacion}`,
      estaciones
    );
    setUpload(true);
    console.log("actualizado sin imagen");

    if (!file) {
      console.log("necesitas cargar un archivo");
      return;
    }

    const formdata = new FormData();
    formdata.append("image", file);

    setUploadImage(true);
    console.log("actualizado con imagen");

    setEstaciones({
      estacion: "Seleccionar estación",
      nombre: "",
      longitud: "",
      latitud: "",
      descripcion: "",
    });

    await axios.post(
      "https://zoratamamap.herokuapp.com/estaciones/image/" + estacion,
      formdata
    );
    document.getElementById("fileInput").value = null;
    setFile(null);

    // console.log(upload);
  };

  const selectedHandle = (e) => {
    setFile(e.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setEstaciones((old) => ({
      ...old,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <>
      <h3 className="my-2 text-center">Actualizar estación</h3>
      <select
        className="form-select "
        aria-label="Default select example"
        name="estacion"
        onChange={handleChange}
      >
        <option defaultValue={"0"}>Seleccionar estación</option>
        {data.map((estacion) => (
          <option key={estacion.ID_Estacion} value={estacion.ID_Estacion}>
            {estacion.nombre}
          </option>
        ))}
      </select>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12">
            <label htmlFor="exampleInputEmail30" className={styles.text}>
              Nombre
            </label>

            <div className={styles["input-box"]}>
              <input
                className={`${styles["input"]} ${styles["nombre"]}`}
                type="text"
                id="exampleInputEmail30"
                name="nombre"
                value={estaciones.nombre}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <label htmlFor="exampleInputEmail31" className={styles.text}>
              Longitud
            </label>

            <div className={styles["input-box"]}>
              <input
                className={styles.input}
                type="text"
                id="exampleInputEmail31"
                name="longitud"
                value={estaciones.longitud}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-6">
            <label htmlFor="exampleInputEmail32" className={styles.text}>
              Latitud
            </label>
            <div className={styles["input-box"]}>
              <input
                className={styles.input}
                type="text"
                id="exampleInputEmail32"
                name="latitud"
                value={estaciones.latitud}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <label htmlFor="exampleInputEmail33" className={styles.text}>
              Descripción
            </label>

            <div className={styles["input-box"]}>
              <textarea
                name="descripcion"
                value={estaciones.descripcion}
                type="text"
                cols="30"
                rows="10"
                className={styles.textArea}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="container">
              <div className={styles["imagen-texto"]}>
                <label htmlFor="exampleInputEmail34" className={styles.text}>
                  Imagen
                </label>
                <input
                  type="file"
                  id="fileInput"
                  className="form-control mt-2"
                  onChange={selectedHandle}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles["input-box-2"]}>
          <button type="submit" className={styles.button}>
            Actualizar
          </button>
        </div>
      </form>
    </>
  );
};

export default UpdateStation;
