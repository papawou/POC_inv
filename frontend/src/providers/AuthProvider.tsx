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
    const [jwt, setJwt] = useState<string | null>();

    const handleLogout = useCallback(() => {
        setUser(null)
    }, [])

    const handleLogin = useCallback(async (credentials: { email: string, password: string }) => {
        const token = await login(credentials);
        localStorage.setItem("jwt", token.access_token);
        console.log(token)
    }, [])


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
        const timeout = setTimeout(() => {
            setJwt(null);
        }, 100000)
        return () => clearTimeout(timeout)
    }, [jwt])

    useEffect(() => {
        const handleJwt = (event: StorageEvent) => {
            if (event.key === "jwt") {
                if (!isDef(event.newValue)) {
                    setJwt(null)
                }
                else {
                    setJwt(event.newValue)
                }
            }
        }
        window.addEventListener("storage", handleJwt)
        return () => {
            window.removeEventListener("storage", handleJwt)
        }
    }, [])

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