import styles from "../styles/login.module.css";
import "../style.css";
// import img_1 from "../images/r1.jpg";
import logo from "../images/logo-final_opt.svg";
import { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserProvider";
import { useForm } from "react-hook-form";
import { formValidate } from "../utilities/formValidate";
import FormError from "../components/FormError";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// axios.defaults.withCredentials = false;

const Login = () => {
  /* const initialState = {
    email: "",
    password: "",
  }; */

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const URI = "https://zoratama-map.netlify.app/auth";

  const { required } = formValidate();

  // Guarda el email y la password del usuario que intenta logearse
  // const [user, setUser] = useState(initialState);
  const { setAdmin } = useContext(UserContext);
  const { online, setOnline } = useContext(UserContext);

  // const { email, password } = user;
  const navigate = useNavigate();
  useEffect(() => {
    provideAccess();
  }, [online]);

  //Enviar formulario
  /* const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      console.log("Complete todos los campos");
      return;
    }
    //Se envia la URI con el email y la contraseña que el usuario digito en el formulario
    const res = await axios.post(URI, user);
    setOnline(res.data.isOnline);
    setAdmin(res.data.isAdmin);

   
  }; */
  //Enviar formulario con react hook form
  const onSubmit = async (data) => {
    try {
      // const res = await axios.post(URI, data);
      const res = await axios({
        method: "post",
        url: URI,
        data,
        withCredentials: true,
      });

      setOnline(res.data.isOnline);
      setAdmin(res.data.isAdmin);
    } catch (error) {
      console.log();
      toast.error(`${error.response.data.message}`, {
        position: toast.POSITION.TOP_RIGHT,
        closeOnClick: false,
        theme: "colored",
        autoClose: 3000,
      });
    }
  };

  const provideAccess = () => {
    if (online) {
      navigate("/mapView");
      console.log("usuario online");
    } else {
      console.log("usuario offline");
    }
  };

  /* const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((old) => ({
      ...old,
      [name]: value,
    }));
  }; */

  return (
    <>
      {/* <!--g-o quitamos scroll lateral--> */}
      <div className="row g-0">
        {/* <!--TODA LA SECCION DEL CARROUSEL--> */}
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
          {/* <!--acomoda texto d-flex flex-column--> */}

          {/* <!-- formulario (contendra el lago del login) --> */}

          <div className="px-lg-5 pt-lg-4 pb-lg-3 p-2  w-100 ">
            {/* <!--añadir pading al div del logo para hacerlo responsive--> */}
            <img src={logo} alt="img-fluid" />
          </div>

          <div className="px-lg-5 py-lg-4 p-sm-4 p-2  w-100 align-self-center">
            {/* <!--añadir pading al div del logo para hacerlo responsive alinea igual al logo--> */}
            <h1 className="font-weight-bold pt-2 pt-sm-5 text-light">
              Bienvenido de vuelta
            </h1>

            {/* <!--Formulario de ingreso--> */}

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

              {/* <div className={styles["text"]}>
                <h6>
                  ¿Olvidaste tu contraseña?{" "}
                  <a href="#" className={styles["text-a"]}>
                    Recuperala
                  </a>
                </h6>
              </div> */}

              <div className={styles["input-box"]}>
                <button className={styles.button}>Iniciar Sesión</button>
              </div>
            </form>
            {/* <!--Seccion O inicia sesion--> */}
            {/* <p class="font-weight-bold text-center text-muted">O inicia sesion con</p> <!--text-center para centrar el texto--> */}

            {/* <div className="d-flex justify-content-around">
              

              <button
                type="submit"
                className="btn btn-outline-black-x flex-grow-1 mr-2"
              >
                {" "}
                <i className="fa-brands fa-google lead mr-2"></i> Google
              </button>

              <button
                type="submit"
                className="btn btn-outline-black-x flex-grow-1 ml-2"
              >
                {" "}
                <i className="fa-brands fa-facebook lead mr-2"></i> Facebook
              </button>
            </div> */}
          </div>

          <div className="text-center px-lg-5 pt-lg-4  pb-lg-4 p-sm-4 p-3  w-100 ">
            {/* <!--seccion crear CUENTA-->     <!--text-black cambio de color y font-weight-bold para que no tenga movimiento--> */}
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
