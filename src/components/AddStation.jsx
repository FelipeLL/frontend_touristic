import { useState } from "react";
import styles from "../updateStation.module.css";
import axios from "axios";
const AddStation = () => {
  const initialState = {
    nombre: "",
    descripcion: "",
    longitud: "",
    latitud: "",
  };
  const URI = "http://localhost:5000/estaciones";

  const [estacion, setEstacion] = useState(initialState);

  const { nombre, descripcion, longitud, latitud } = estacion;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!longitud.trim() || !latitud.trim() || !nombre.trim()) {
      console.log("Complete todos los campos");
      return;
    }
    const res = await axios.post(URI, estacion);
    console.log(estacion);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEstacion((old) => ({
      ...old,
      [name]: value,
    }));
  };

  return (
    <>
      <h3 className="my-5 text-center">Añadir estación</h3>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12">
            <label htmlFor="exampleInputEmail1" className={styles.text}>
              Nombre
            </label>

            <div className={styles["input-box"]}>
              <input
                className={`${styles["input"]} ${styles["nombre"]}`}
                type="text"
                id="exampleInputEmail1"
                name="nombre"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <label htmlFor="exampleInputEmail1" className={styles.text}>
              Longitud
            </label>

            <div className={styles["input-box"]}>
              <input
                className={styles.input}
                type="number"
                id="exampleInputEmail1"
                name="longitud"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-6">
            <label htmlFor="exampleInputEmail2" className={styles.text}>
              Latitud
            </label>
            <div className={styles["input-box"]}>
              <input
                className={styles.input}
                type="number"
                id="exampleInputEmail2"
                name="latitud"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <label htmlFor="exampleInputEmail1" className={styles.text}>
              Descripción
            </label>

            <div className={styles["input-box"]}>
              <textarea
                name="descripcion"
                type="text"
                cols="30"
                rows="10"
                className={styles.textArea}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className={styles["input-box"]}>
          <button type="submit" className={styles.button}>
            Agregar
          </button>
        </div>
      </form>
    </>
  );
};

export default AddStation;
