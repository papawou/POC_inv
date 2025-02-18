import { Route, Routes } from "react-router-dom";
import { GuestGuard } from "./GuestGuard";
import Paths from "../technical/Paths";
import { Fullpage } from "../Fullpage";
import { KpiPanel } from "../KpiPanel";
import { NotFound } from "../ui/NotFound";
import { Login } from "../Login";
import { UserGuard } from "./UserGuard";

export function Router() {
    return (
        <Routes>
            {/* Guest only */}
            <Route element={<GuestGuard />}>
                <Route path={Paths.Login} element={<Login />} />
            </Route>

            {/* User only */}
            <Route element={<UserGuard />}>
                <Route element={<Fullpage />}>
                    <Route path={Paths.Home} element={<KpiPanel />} />
                </Route>
            </Route>

            <Route path="*" element={<NotFound backPath={Paths.Home} />} />
        </Routes>
    )
}