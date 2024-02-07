import { Navigate, Outlet } from "react-router-dom";
import { decode } from "base-64";

const ProtectedRoutes = (props) => {
    let role = localStorage.getItem('_user');
    if(role) role = JSON.parse(decode(role));
    let token = localStorage.getItem('_token');
    let auth = { token: Boolean(token) };

    if (auth.token) {
        if (props.roles.includes(role.role)) {
            return <Outlet />;

        } else {
            return <Navigate to="/" />;
        }

    } else {
        if(props.admin){
            return <Navigate to="/" />;
        }else{
            return <Navigate to="/login" />;
        }
    }
}

export default ProtectedRoutes