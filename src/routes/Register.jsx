import styles from "../styles/register.module.css";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { formValidate } from "../utilities/formValidate";
import FormError from "../components/FormError";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const URI = "http://localhost:5000/users/register";

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const {
    required,
    patternEmail,
    minLength,
    validateTrim,
    validateEquals,
    patternPassword,
  } = formValidate();

  const onSubmit = async (data) => {
    try {
      await axios.post(URI, data);
      toast.success(`La cuenta ha sido creada satisfactoriamente`, {
        position: toast.POSITION.TOP_RIGHT,
        closeOnClick: false,
        theme: "colored",
        autoClose: 3000,
      });
    } catch (error) {
      toast.error(`${error.response.data.message}`, {
        position: toast.POSITION.TOP_RIGHT,
        closeOnClick: false,
        theme: "colored",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.wrapper}>
        <h2 className={styles["titulo-h2"]}>Registrarse</h2>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles["input-box"]}>
            <input
              className={styles.input}
              type="text"
              placeholder="Nombre"
              name="nombre"
              {...register("nombre", {
                required,
              })}
            />
          </div>
          {errors.nombre && <FormError error={errors.nombre} />}
          <div className={styles["input-box"]}>
            <input
              className={styles.input}
              type="text"
              placeholder="Apellido"
              name="apellido"
              {...register("apellido", {
                required,
              })}
            />
          </div>
          {errors.apellido && <FormError error={errors.apellido} />}
          <div className={styles["input-box"]}>
            <input
              className={styles.input}
              type="text"
              placeholder="Teléfono"
              name="telefono"
              {...register("telefono", {
                required,
              })}
            />
          </div>
          {errors.telefono && <FormError error={errors.telefono} />}
          <div className={styles["input-box"]}>
            <input
              className={styles.input}
              type="text"
              placeholder="Correo electrónico"
              name="correo"
              {...register("correo", {
                required,
                pattern: patternEmail,
              })}
            />
          </div>
          {errors.correo && <FormError error={errors.correo} />}
          <div className={styles["input-box"]}>
            <input
              className={styles.input}
              type="password"
              placeholder="Contraseña"
              name="password"
              {...register("password", {
                minLength,
                validate: validateTrim,
                pattern: patternPassword,
              })}
            />
          </div>
          {errors.password && <FormError error={errors.password} />}

          <div className={styles["input-box"]}>
            <input
              className={styles.input}
              type="password"
              placeholder="Confirmar contraseña"
              name="confirmPassword"
              {...register("confirmPassword", {
                validate: validateEquals(getValues),
              })}
            />
          </div>
          {errors.confirmPassword && (
            <FormError error={errors.confirmPassword} />
          )}

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
      <ToastContainer />
    </div>
  );
};

export default Register;
