import "react-toastify/dist/ReactToastify.css";
import "../style.css";
import styles from "../styles/login.module.css";
import logo from "../images/logo-final_opt.svg";
import { UserContext } from "../context/UserProvider";
import { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { formValidate } from "../utilities/formValidate";
import FormError from "../components/FormError";
import { alertError } from "../utilities/Alerts";
import { ToastContainer } from "react-toastify";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { required } = formValidate();
  const navigate = useNavigate();

  const URI = "https://zoratamamap.herokuapp.com/auth";

  const { setAdmin } = useContext(UserContext);
  const { online, setOnline } = useContext(UserContext);

  useEffect(() => {
    provideAccess();
  }, [online]);

  const onSubmit = async (data) => {
    try {
      const res = await axios({
        method: "post",
        url: URI,
        data,
        withCredentials: true,
      });

      setOnline(res.data.isOnline);
      setAdmin(res.data.isAdmin);
    } catch (error) {
      alertError(error.response.data.message);
    }
  };

  const provideAccess = () => {
    online && navigate("/mapView");
  };

  return (
    <>
      <div className="row g-0">
        <div className="col-lg-7 d-none d-lg-block">
          {/* <!--d lg block para que se muestra a partir de dispositivos medianos--> */}

          <div
            id="carouselExampleDark"
            className="carousel carousel-dark slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div className="carousel-inner">
              {/* <!--IMAGEN 1--> */}
              <div
                className="carousel-item img-1 min-vh-100 active"
                data-bs-interval="3000"
              >
                <div className="carousel-caption d-none d-md-block">
                  <h5 className="fw-bold">Descubre algo sorprendete</h5>
                </div>
              </div>
              {/* <!--IMAGEN 2--> */}
              <div
                className="carousel-item img-2 min-vh-100"
                data-bs-interval="3000"
              >
                <div className="carousel-caption d-none d-md-block">
                  <h5 className="font-weight-bold">
                    Descubre algo sorprendete
                  </h5>
                </div>
              </div>
              {/* <!--IMAGEN 3--> */}
              <div
                className="carousel-item img-3 min-vh-100"
                data-bs-interval="3000"
              >
                <div className="carousel-caption d-none d-md-block">
                  <h5 className="font-weight-bold">
                    Descubre algo sorprendete
                  </h5>
                </div>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        <div className="col-lg-5 d-flex flex-column align-items-end min-vh-100">
          <div className="px-lg-5 pt-lg-4 pb-lg-3 p-2  w-100 ">
            <img src={logo} alt="img-fluid" />
          </div>

          <div className="px-lg-5 py-lg-4 p-sm-4 p-2  w-100 align-self-center">
            <h1 className="font-weight-bold pt-2 pt-sm-5 text-light">
              Bienvenido de vuelta
            </h1>

            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="exampleInputEmail1" className={styles.text}>
                Correo electronico
              </label>

              <div className={styles["input-box"]}>
                <input
                  className={styles.input}
                  type="text"
                  id="exampleInputEmail1"
                  placeholder="Ingresa tu correo electrónico"
                  name="email"
                  {...register("email", {
                    required,
                  })}
                />
              </div>
              {errors.email && <FormError error={errors.email} />}
              <label htmlFor="exampleInputEmail2" className={styles.text}>
                Contraseña
              </label>
              <div className={styles["input-box"]}>
                <input
                  className={styles.input}
                  type="password"
                  id="exampleInputEmail2"
                  placeholder="Ingresa tu contraseña"
                  name="password"
                  {...register("password", {
                    required,
                  })}
                />
              </div>
              {errors.password && <FormError error={errors.password} />}

              <div className={styles["input-box"]}>
                <button className={styles.button}>Iniciar Sesión</button>
              </div>
            </form>
          </div>

          <div className="text-center px-lg-5 pt-lg-4  pb-lg-4 p-sm-4 p-3  w-100 ">
            <p className={`d-inline-block mb-0 ${styles.link}`}>
              ¿Todavia no tienes una cuenta?
            </p>
            <Link to="/register" className={styles["text-a"]}>
              {" "}
              Crea una ahora
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
