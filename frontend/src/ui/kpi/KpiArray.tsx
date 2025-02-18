import { type KpiArray } from "../../pages/KpiPanel";


type Props = {
    kpi: KpiArray
}

export function KpiArray({ kpi }: Props) {
    return (
        <div className="p-4 bg-white rounded-2xl shadow-lg flex flex-col items-center text-center">
            <h3 className="text-lg font-semibold text-gray-700">{kpi.title}</h3>
            <ul className="text-md font-bold text-blue-600">
                {kpi.value.map((region) => (
                    <li key={region.id}>{region.title}</li>
                ))}
            </ul>
        </div>
    )
}