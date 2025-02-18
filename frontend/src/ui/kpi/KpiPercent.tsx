import { type KpiPercent } from "../../pages/KpiPanel"

type Props = {
    kpi: KpiPercent
}

export function KpiPercent({ kpi }: Props) {
    return (
        <div className="p-4 bg-white rounded-2xl shadow-lg flex flex-col items-center text-center">
            <h3 className="text-lg font-semibold text-gray-700">{kpi.title}</h3>
            <p className="text-2xl font-bold text-green-600">{kpi.value}</p>
        </div>
    )
}