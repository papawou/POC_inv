import { createContext, PropsWithChildren, useContext, useMemo } from "react"
import { User } from "./AuthProvider"

type ViewerContextValue = { user: User };

const ViewerContext = createContext<ViewerContextValue>(Object.create(null))
export const useViewer = () => useContext(ViewerContext);

type Props = {
    user: User,
} & PropsWithChildren
export const ViewerProvider = ({ user, children }: Props) => {
    return (
        <ViewerContext.Provider value={{ user }}>
            {children}
        </ViewerContext.Provider>
    )
}