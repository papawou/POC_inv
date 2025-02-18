import { Navigate, Outlet } from "react-router-dom";
import Paths from "../technical/Paths";
import { useAuth } from "../providers/AuthProvider";
import { isDef } from "../technical/isDef";
import { ViewerProvider } from "../providers/ViewerProvider";

export function UserGuard() {
    const { user } = useAuth()

    if (!isDef(user)) {
        return <Navigate to={Paths.Login} replace />;
    }
    return (
        <ViewerProvider user={user}>
            <Outlet />
        </ViewerProvider>
    )
}
