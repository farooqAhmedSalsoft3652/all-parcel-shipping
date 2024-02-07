import { Navigate, Outlet } from "react-router-dom";
import { roles } from "@config/data";
import { decode } from "base-64";

export default function PreventAdmin() {
    let role = localStorage.getItem('_user');
    if(role) role = JSON.parse(decode(role));
    let token = localStorage.getItem('_token');
    let auth = { token: Boolean(token) };

    if(auth.token && role.role === roles.admin){
        return <Navigate to="/admin/dashboard" />;
    }
    return <Outlet />;
}
