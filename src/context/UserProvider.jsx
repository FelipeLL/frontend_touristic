import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [online, setOnline] = useState(false);
  const [admin, setAdmin] = useState();
  const [upload, setUpload] = useState(false);
  const [uploadImage, setUploadImage] = useState(false);

  useEffect(() => {
    readToken();
  }, []);
  // esta función lee el token mediante una petición a la base de datos, si existe el token online se establece en true manteniendo la conexión del usuario en linea gracias al Auth.jsx
  const readToken = async () => {
    const res = await axios.get("https://zoratamamap.herokuapp.com/auth");

    if (res.data.isToken) {
      setOnline(true);
      setAdmin(true);
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
