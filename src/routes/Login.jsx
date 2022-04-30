import "../styles.css";
import img_1 from "../images/r1.jpg";
import logo from "../images/logo-final_opt.svg";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserProvider";

axios.defaults.withCredentials = true;

const Login = () => {
  const initialState = {
    email: "",
    password: "",
  };

  const URI = "http://localhost:5000/auth";

  // Guarda el email y la password del usuario que intenta logearse
  const [user, setUser] = useState(initialState);
  const [admin, setAdmin] = useState();
  const { online, setOnline } = useContext(UserContext);

  const { email, password } = user;
  const navigate = useNavigate();
  useEffect(() => {
    provideAccess();
  }, [online]);

  //Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      console.log("Complete todos los campos");
      return;
    }
    //Se envia la URI con el email y la contraseña que el usuario digito en el formulario
    const res = await axios.post(URI, user);
    setOnline(res.data.isOnline);
    setAdmin(res.data.isAdmin);

    /* const res = await axios({
      method: "post",
      baseURL: "/users",
      data: user,
      withCredentials: true,
    }); */
  };

  const provideAccess = () => {
    if (online) {
      !admin ? navigate("/mapView") : navigate("/register");
      console.log("usuario online");
    } else {
      console.log("usuario offline");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((old) => ({
      ...old,
      [name]: value,
    }));
  };

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
                  <h5 className="font-weight-bold">
                    Descubre algo sorprendete
                  </h5>
                  <a href="#" className="text-muted text-decoration-none">
                    {" "}
                    <i className="fa-light fa-location-check"></i>Descarga
                    nuestra app
                  </a>
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
                  <a href="#" className="text-muted text-decoration-none">
                    Descarga nuestra app
                  </a>
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
                  <a href="#" className="text-muted text-decoration-none">
                    {" "}
                    <i className="fa-light fa-location-check"></i>Descarga
                    nuestra app
                  </a>
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

          <div className="px-lg-5 pt-lg-4 pb-lg-3 p-4 w-100 mb-auto">
            {/* <!--añadir pading al div del logo para hacerlo responsive--> */}
            <img src={logo} alt="img-fluid" />
          </div>

          <div className="px-lg-5 py-lg-4 p-4 w-100 align-self-center">
            {/* <!--añadir pading al div del logo para hacerlo responsive alinea igual al logo--> */}
            <h1 className="font-weight-bold mb-4 text-light">
              Bienvenido de vuelta
            </h1>

            {/* <!--Formulario de ingreso--> */}
            <form className="mb-5" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="exampleInputEmail1"
                  className="form-label font-weight-bolds text-dark-x"
                >
                  Email
                </label>
                {/* <!--clase bg-dark en los inputs de los formularios - border-0 quitar borde - placeholder añadir texto dentro--> */}
                <input
                  type="email"
                  className="form-control bg-gray border-0 text-dark-x"
                  placeholder="Ingresa tu email"
                  id="exampleInputEmail1"
                  name="email"
                  onChange={handleChange}
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="exampleInputPassword1"
                  className="form-label font-weight-bold text-gray"
                >
                  Contraseña
                </label>
                {/* <!--clase bg-dark en los inputs de los formularios - border-0 quitar borde - placeholder añadir texto dentro--> */}
                <input
                  type="password"
                  className="form-control bg-gray border-0 text-dark-x"
                  placeholder="Ingresa tu contraseña"
                  id="exampleInputPassword1"
                  name="password"
                  onChange={handleChange}
                />

                <a
                  href="#"
                  id="emailHelp"
                  className="form-text text-muted text-decoration-none"
                >
                  ¿Has olvidado tu contraseña?
                </a>
                {/* <!--seccion olvidaste tu CONTRASEÑA--> */}
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Iniciar Sesion
              </button>
              {/* <!--Boton iniciar sesion -- w-100 abarque todo el form--> */}
            </form>
            {/* <!--Seccion O inicia sesion--> */}
            {/* <p class="font-weight-bold text-center text-muted">O inicia sesion con</p> <!--text-center para centrar el texto--> */}

            <div className="d-flex justify-content-around">
              {/* <!--SECCION BOTONES FACEBOOK Y GOOGLE
            centrar y mantener distancia por defecto =justify-content-around --> */}

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
            </div>
          </div>

          <div className="text-center px-lg-5 pt-lg-3 pb-lg-4 p-4 w-100 mt-auto">
            {/* <!--seccion crear CUENTA-->     <!--text-black cambio de color y font-weight-bold para que no tenga movimiento--> */}
            <p className="d-inline-block mb-0 ">
              ¿Todavia no tienes una cuenta?
            </p>
            <a
              href="#"
              className="text-dark-x font-weight-bold 
            text-decoration-none"
            >
              {" "}
              Crea una ahora
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
