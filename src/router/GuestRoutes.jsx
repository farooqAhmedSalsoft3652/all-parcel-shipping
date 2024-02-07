import { Navigate, Outlet } from "react-router-dom"

const GuestRoutes = (props) => {
    let token = localStorage.getItem('_token');
    let auth = { token: Boolean(token) };

    if(auth.token){
        if(props.admin){
            return <Navigate to="/admin/dashboard" />
        }else{
            return <Navigate to="/" />
        }
    }else{
        return <Outlet />;
    }
}

export default GuestRoutes