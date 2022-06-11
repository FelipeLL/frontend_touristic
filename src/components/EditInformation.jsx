import React, { useState } from "react";
import styles from "../styles/editInformation.module.css";
const EditInformation = () => {
  const [user, setUser] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("actualizado info");
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setUser((old) => ({
      ...old,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  return (
    <>
      <h3 className="my-5 text-center">Información</h3>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12">
            <label htmlFor="exampleInputEmail1" className={styles.text}>
              Nombre
            </label>

            <div className={styles["input-box"]}>
              <input
                className={`${styles["input"]} `}
                type="text"
                id="exampleInputEmail1"
                name="nombre"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-12">
            <label htmlFor="exampleInputEmail2" className={styles.text}>
              Apellido
            </label>

            <div className={styles["input-box"]}>
              <input
                className={`${styles["input"]} `}
                type="text"
                id="exampleInputEmail2"
                name="apellido"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <label htmlFor="exampleInputEmail3" className={styles.text}>
              Teléfono
            </label>

            <div className={styles["input-box"]}>
              <input
                className={styles.input}
                type="number"
                id="exampleInputEmail3"
                name="telefono"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-12">
            <label htmlFor="exampleInputEmail4" className={styles.text}>
              Correo Electrónico
            </label>
            <div className={styles["input-box"]}>
              <input
                className={styles.input}
                type="email"
                id="exampleInputEmail4"
                name="email"
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

export default EditInformation;
