import { useState, useContext } from "react";
import { UserContext } from "../context/UserProvider";
import styles from "../styles/addStation.module.css";
import axios from "axios";
import { useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AddStation = () => {
  const initialState = {
    nombre: "",
    descripcion: "",
    longitud: "",
    latitud: "",
  };

  const inputNameRef = useRef(null);
  const inputLngRef = useRef(null);
  const inputLatRef = useRef(null);
  const inputDesRef = useRef(null);

  const URI = "https://zoratama-map.netlify.app/estaciones";
  const [estaciones, setEstaciones] = useState(initialState);
  const { setUpload } = useContext(UserContext);
  const { nombre, longitud, latitud } = estaciones;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!longitud.trim() || !latitud.trim() || !nombre.trim()) {
      toast.warning("Complete todos los campos", {
        position: toast.POSITION.TOP_LEFT,
        closeOnClick: false,
        theme: "colored",
        autoClose: 3000,
      });
      return;
    }

    await axios.post(URI, estaciones);
    setUpload(true);
    setEstaciones({
      nombre: "",
      descripcion: "",
      longitud: "",
      latitud: "",
    });
    inputNameRef.current.value = "";
    inputLngRef.current.value = "";
    inputLatRef.current.value = "";
    inputDesRef.current.value = "";
    toast.info("Estación agregada correctamente", {
      position: toast.POSITION.TOP_LEFT,
      closeOnClick: false,
      theme: "colored",
      autoClose: 3000,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEstaciones((old) => ({
      ...old,
      [name]: value,
    }));
  };

  return (
    <>
      <h3 className={`${styles["logo_name"]} text-center`}>Añadir estación</h3>
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
                ref={inputNameRef}
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
                ref={inputLngRef}
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
                ref={inputLatRef}
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
                rows="15"
                className={styles.textArea}
                onChange={handleChange}
                ref={inputDesRef}
              />
            </div>
          </div>
        </div>

        <div className={styles["input-box-2"]}>
          <button type="submit" className={styles.button}>
            Agregar
          </button>
        </div>
      </form>

      <ToastContainer />
    </>
  );
};

export default AddStation;
