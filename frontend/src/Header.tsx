import { useAuth } from "./providers/AuthProvider";
import { useViewer } from "./providers/ViewerProvider";

export function Header() {
    const { logout } = useAuth();
    const { user } = useViewer();

    return (
        <header className="w-full p-4 flex justify-end bg-gray-100 shadow-md">
            <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
                {user?.email}
            </button>
        </header>
    )
}