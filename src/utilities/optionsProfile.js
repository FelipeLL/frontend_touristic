import ViewProfile from "../components/ViewProfile"
import UpdateProfile from "../components/UpdateProfile"
import UpdatePassword from "../components/UpdatePassword"

export const optionsProfile = (option) => {
    switch (option) {
        case "1":
            return <ViewProfile />
        case "2":
            return <UpdateProfile />;
        case "3":
            return <UpdatePassword />;
        default:
            return "Ocurrio un error en el server";
    }
}