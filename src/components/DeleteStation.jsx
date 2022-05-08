import { useEffect, useState, useContext } from "react";
import styles from "../deleteStation.module.css";
import axios from "axios";
import { UserContext } from "../context/UserProvider";
const DeleteStation = () => {
  const { upload, setUpload } = useContext(UserContext);
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
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (estaciones.estacion === "Seleccionar estación") {
      console.log("Complete todos los campos");
      return;
    }
    const res = await axios.delete(
      `https://zoratamamap.herokuapp.com/estaciones/${estaciones.estacion}`
    );
    setUpload(true);
    console.log("eliminado");
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
      <h3 className="my-5 text-center">Eliminar estación</h3>
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

      <form onSubmit={handleSubmit}>
        <div className={styles["input-box"]}>
          <button type="submit" className={styles.button}>
            Eliminar
          </button>
        </div>
      </form>
    </>
  );
};

export default DeleteStation;
