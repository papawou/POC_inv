import { Link } from "react-router-dom";

type Props = {
    backPath: string
}

export function NotFound({ backPath }: Props) {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
            <h1 className="text-4xl font-bold">404</h1>
            <p className="text-lg text-gray-600 mt-2">Page Not Found</p>
            <Link
                to={backPath}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
                Go Home
            </Link>
        </div>
    );
}
