import { createContext, PropsWithChildren, useContext, useMemo } from "react"

type User = {
    email: string
}

type ViewerContextValue = {
    user: User
}

const ViewerContext = createContext<ViewerContextValue>(Object.create(null))
export const useViewer = () => useContext(ViewerContext);

type Props = {
    user: User
} & PropsWithChildren

export const ViewerProvider = ({ user, children }: Props) => {
    const contextValue: ViewerContextValue = useMemo(() => ({
        user,
    }), [user])

    return (
        <ViewerContext.Provider value={contextValue}>
            {children}
        </ViewerContext.Provider>
    )
}