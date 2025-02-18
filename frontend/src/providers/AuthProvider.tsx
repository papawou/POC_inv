import { jwtDecode } from "jwt-decode"
import { createContext, PropsWithChildren, useCallback, useContext, useMemo, useState } from "react"
import { login } from "../api/user"

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
        setUser(null)
    }, [])

    const handleLogin = useCallback(async (credentials: { email: string, password: string }) => {
        const token = await login(credentials);
        const decoded = jwtDecode<{ email: string }>(token.access_token);
        setUser({
            email: decoded.email,
            jwt: token.access_token
        })
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