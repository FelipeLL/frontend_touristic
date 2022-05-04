import React from "react";
import { useState, useEffect } from "react";
import styles from "../updateStation.module.css";
import axios from "axios";
const UpdateStation = () => {
  useEffect(() => {
    const axiosData = async () => {
      const URI = "http://localhost:5000/estaciones";
      const res = await axios.get(URI);
      setData(res.data);
    };
    axiosData();
  }, []);

  const [data, setData] = useState([]);

  const [estaciones, setEstaciones] = useState({
    estacion: "Seleccionar estación",
    nombre: "",
    longitud: "",
    latitud: "",
  });
  const { estacion, nombre, longitud, latitud } = estaciones;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !nombre.trim() ||
      estacion === "Seleccionar estación" ||
      !longitud.trim() ||
      !latitud.trim()
    ) {
      console.log("Complete todos los campos");
      return;
    }
    console.log(estaciones);
    const res = await axios.put(
      `http://localhost:5000/estaciones/${estacion}`,
      estaciones
    );

    console.log("actualizado");
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
      <h3 className="my-5 text-center">Actualizar estación</h3>
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
                type="text"
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
                type="text"
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
            Actualizar
          </button>
        </div>
      </form>
    </>
  );
};

export default UpdateStation;
