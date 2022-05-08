import styles from "../register.module.css";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
const Register = () => {
  const URI = "http://localhost:5000/users/register";
  const initialState = {
    nombre: "",
    apellido: "",
    telefono: "",
    correo: "",
    password: "",
  };
  const [register, setRegister] = useState(initialState);
  const { nombre, apellido, telefono, correo, password } = register;

  //navigate es para mandarlo a una ruta especificada

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !nombre.trim() ||
      !apellido.trim() ||
      !telefono.trim() ||
      !correo.trim() ||
      !password.trim()
    ) {
      // e.target[0].focus();
      console.log("Complete todos los campos");
      return;
    }
    //enviando los datos al backend
    await axios.post(URI, register);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister((old) => ({
      ...old,
      [name]: value,
    }));
  };

  return (
    <div className={styles.body}>
      <div className={styles.wrapper}>
        <h2 className={styles["titulo-h2"]}>Registrarse</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles["input-box"]}>
            <input
              className={styles.input}
              type="text"
              placeholder="Nombre"
              name="nombre"
              onChange={handleChange}
              value={nombre}
            />
          </div>
          <div className={styles["input-box"]}>
            <input
              className={styles.input}
              type="text"
              placeholder="Apellido"
              name="apellido"
              onChange={handleChange}
              value={apellido}
            />
          </div>
          <div className={styles["input-box"]}>
            <input
              className={styles.input}
              type="text"
              placeholder="Teléfono"
              name="telefono"
              onChange={handleChange}
              value={telefono}
            />
          </div>
          <div className={styles["input-box"]}>
            <input
              className={styles.input}
              type="text"
              placeholder="Correo electrónico"
              name="correo"
              onChange={handleChange}
              value={correo}
            />
          </div>
          <div className={styles["input-box"]}>
            <input
              className={styles.input}
              type="password"
              placeholder="Contraseña"
              name="password"
              onChange={handleChange}
              value={password}
            />
          </div>

          <div className={styles["input-box"]}>
            <button className={styles.button}>Registrarse</button>
          </div>
        </form>
        <p className="d-inline-block mb-0 ">¿Ya tienes una cuenta?</p>
        <Link to="/" className={styles["text-a"]}>
          {" "}
          Inicia sesión
        </Link>
      </div>
    </div>
  );
};

export default Register;
