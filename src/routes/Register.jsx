import React from "react";
// import "../registerStyles.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const { nombre, apellido, direccion, telefono, correo, password } = register;

  //navigate es para mandarlo a una ruta especificada
  const navigate = useNavigate();

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
    <>
      <div className="container-form sign-up">
        <form className="formulario" onSubmit={handleSubmit}>
          <h2 className="create-account">Bienvenido</h2>
          <div className="iconos">
            <div className="border-icon">
              <i className="bx bxl-instagram"></i>
            </div>
            <div className="border-icon">
              <i className="bx bxl-linkedin"></i>
            </div>
            <div className="border-icon">
              <i className="bx bxl-facebook-circle"></i>
            </div>
          </div>
          <p className="cuenta-gratis">Crea una cuenta, es gratis!</p>
          <input
            type="text"
            className="form-control bg-light border-0 text-dark-x"
            placeholder="Nombre"
            name="nombre"
            onChange={handleChange}
            value={nombre}
          />
          <input
            type="text"
            className="form-control bg-light border-0 text-dark-x"
            placeholder="Apellido"
            name="apellido"
            onChange={handleChange}
            value={apellido}
          />

          <input
            type="tel"
            className="form-control"
            placeholder="Teléfono"
            name="telefono"
            onChange={handleChange}
            value={telefono}
          />
          <input
            type="email"
            className="form-control bg-light border-0 text-dark-x"
            placeholder="Correo electrónico"
            id="exampleInputEmail1"
            name="correo"
            aria-describedby="emailHelp"
            onChange={handleChange}
            value={correo}
          />
          <input
            type="password"
            className="form-control bg-light border-0 text-dark-x"
            placeholder="Ingresa una contraseña"
            id="exampleInputPassword1"
            name="password"
            onChange={handleChange}
            value={password}
          />
          <button type="submit">Registrarse</button>
        </form>
      </div>
    </>
  );
};

export default Register;
