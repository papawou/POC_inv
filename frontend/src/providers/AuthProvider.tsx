import { createContext, PropsWithChildren, useCallback, useContext, useMemo, useState } from "react"


type User = {
    email: string
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

    const handleLogin = useCallback((credentials: { email: string, password: string }) => {
        setUser({ email: credentials.email });
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