import { Navigate, Outlet } from "react-router-dom";
import Paths from "../technical/Paths";
import { useAuth } from "../providers/AuthProvider";
import { isDef } from "../technical/isDef";

export function GuestGuard() {
    const { user } = useAuth()

    if (isDef(user)) {
        return <Navigate to={Paths.Home} replace />;
    }
    return (
        <Outlet />
    )
}
