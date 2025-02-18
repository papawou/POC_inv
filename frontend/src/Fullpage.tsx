import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export function Fullpage() {
    return (
        <div className="w-screen h-screen flex flex-col">
            <Header />
            {<Outlet />}
        </div >
    );
}