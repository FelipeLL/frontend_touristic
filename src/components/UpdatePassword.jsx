import styles from "../styles/updatePassword.module.css";

const UpdatePassword = () => {
  const handleSubmit = (e) => {
    console.log("a");
  };
  return (
    <>
      <h3 className={`text-center ${styles["title"]}`}>
        Actualizar contraseña
      </h3>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-10">
            <label className={styles.text}>Contraseña actual</label>

            <div className={styles["input-box"]}>
              <input type="password" name="password" />
            </div>
          </div>
          <div className="col-10">
            <label className={styles.text}>Confirmar contraseña</label>

            <div className={styles["input-box"]}>
              <input type="password" name="confirmPassword" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-10">
            <label className={styles.text}>Nueva contraseña</label>

            <div className={styles["input-box"]}>
              <input type="password" name="newPassword" />
            </div>
          </div>
        </div>

        <span className={styles["button-box"]}>
          <button type="submit">Actualizar</button>
        </span>
      </form>
      {/* <ToastContainer /> */}
    </>
  );
};

export default UpdatePassword;
