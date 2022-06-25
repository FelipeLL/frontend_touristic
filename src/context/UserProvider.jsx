import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [online, setOnline] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [upload, setUpload] = useState(false);
  const [uploadImage, setUploadImage] = useState(false);

  useEffect(() => {
    readToken();
  }, []);
  // esta función lee el token mediante una petición a la base de datos, si existe el token online se establece en true manteniendo la conexión del usuario en linea gracias al Auth.jsx
  const readToken = async () => {
    //const res = await axios.get("http://localhost:5000/auth");
    const res = await axios({
      method: "get",
      url: "https://zoratama-map.netlify.app/auth",
      withCredentials: true,
    });
    if (res.data.isToken) {
      res.data.isAdmin && setAdmin(true);

      setOnline(true);
    } else {
      setOnline(null);
    }
  };
  return (
    <UserContext.Provider
      value={{
        online,
        setOnline,
        upload,
        setUpload,
        uploadImage,
        setUploadImage,
        admin,
        setAdmin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
