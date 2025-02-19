import { jwtDecode } from "jwt-decode"
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { login } from "../api/user"
import { isDef } from "../technical/isDef"

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

    const handleLogout = useCallback(() => {
        localStorage.removeItem("jwt");
        setUser(null)
    }, [])

    const handleLogin = useCallback(async (credentials: { email: string, password: string }) => {
        const token = await login(credentials);
        localStorage.setItem("jwt", token.access_token);
        const decoded = jwtDecode<{ email: string, exp: number }>(token.access_token);
        setUser({
            email: decoded.email,
            jwt: token.access_token
        });
    }, [])

    useEffect(() => {
        if (!isDef(user)) {
            return;
        }
        const decoded = jwtDecode<{ email: string, exp: number }>(user.jwt);
        const expirationDelay = decoded.exp * 1000 - Date.now();
        if (expirationDelay <= 0) {
            handleLogout();
            return;
        }
        const timeout = setTimeout(() => {
            handleLogout();
        }, expirationDelay)
        return () => { clearTimeout(timeout) }
    }, [user, handleLogout])

    const contextValue: AuthContextValue = useMemo(() => ({
        user,
        login: handleLogin,
        logout: handleLogout
    }), [handleLogin, user])

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}