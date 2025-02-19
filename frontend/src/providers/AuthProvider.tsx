import { jwtDecode } from "jwt-decode"
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { login } from "../api/user"
import { isDef } from "../technical/isDef"
import { updateJwt } from "../technical/jwt"

export type User = {
    email: string,
    jwt: string
}

type AuthContextValue = {
    user: User | null
    logout: () => void
    login: ({ email, password }: { email: string, password: string }) => void
}

const AuthContext = createContext<AuthContextValue>(Object.create(null))
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [user, setUser] = useState<User | null>(null);
    const [jwt, setJwt] = useState<string | null>(localStorage.getItem("jwt"));

    const handleLogout = useCallback(() => {
        updateJwt(null)
    }, []);

    const handleLogin = useCallback(async (credentials: { email: string, password: string }) => {
        const token = await login(credentials);
        updateJwt(token.access_token);
    }, []);

    // jwt storage event
    useEffect(() => {
        const handleJwt = (event: StorageEvent | CustomEvent<{ key: string; value: string | null }>) => {
            if (event instanceof CustomEvent && event.detail.key === "jwt") {
                setJwt(event.detail.value ?? null);
            }
            if (event instanceof StorageEvent && event.key === "jwt") {
                setJwt(event.newValue ?? null);
            }
        }
        window.addEventListener("storage", handleJwt)
        window.addEventListener("localStorageChange", handleJwt as EventListener);
        return () => {
            window.removeEventListener("storage", handleJwt)
            window.removeEventListener("localStorageChange", handleJwt as EventListener);
        }
    }, []);

    // jwt expiration
    useEffect(() => {
        if (!isDef(jwt)) {
            setUser(null)
            return;
        }
        const decoded = jwtDecode<{ email: string, exp: number }>(jwt);
        setUser({
            email: decoded.email,
            jwt
        });
        const expirationDelay = decoded.exp * 1000 - Date.now();
        if (expirationDelay <= 0) {
            handleLogout();
            return;
        }
        const timeout = setTimeout(() => {
            handleLogout();
        }, expirationDelay)
        return () => { clearTimeout(timeout) }
    }, [jwt, handleLogout]);

    const contextValue: AuthContextValue = useMemo(() => ({
        user,
        login: handleLogin,
        logout: handleLogout
    }), [handleLogin, handleLogout, user]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}
