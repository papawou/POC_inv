import { isDef } from "./isDef";

export function updateJwt(value: string | null) {
    if (isDef(value)) {
        localStorage.setItem("jwt", value);
    } else {
        localStorage.removeItem("jwt");
    }
    window.dispatchEvent(new CustomEvent("localStorageChange", { detail: { key: "jwt", value } }));
};