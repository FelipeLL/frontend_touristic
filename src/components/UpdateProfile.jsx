import styles from "../styles/updateProfile.module.css";

const UpdateProfile = () => {
  const handleSubmit = (e) => {
    console.log("a");
  };

  return (
    <>
      <h3 className={`text-center ${styles["title"]}`}>
        Actualizar información
      </h3>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-6">
            <label htmlFor="exampleInputEmail30" className={styles.text}>
              Nombre(s)
            </label>

            <div className={styles["input-box"]}>
              <input type="text" id="exampleInputEmail30" name="nombre" />
            </div>
          </div>
          <div className="col-6">
            <label htmlFor="exampleInputEmail30" className={styles.text}>
              Apellido(s)
            </label>

            <div className={styles["input-box"]}>
              <input type="text" id="exampleInputEmail30" name="apellido" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <label htmlFor="exampleInputEmail31" className={styles.text}>
              Correo
            </label>

            <div className={styles["input-box"]}>
              <input type="text" id="exampleInputEmail31" name="correo" />
            </div>
          </div>
          <div className="col-12">
            <label htmlFor="exampleInputEmail32" className={styles.text}>
              Teléfono
            </label>
            <div className={styles["input-box"]}>
              <input type="text" id="exampleInputEmail32" name="telefono" />
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

export default UpdateProfile;
