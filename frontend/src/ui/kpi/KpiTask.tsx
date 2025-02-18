import { type KpiTask } from "../../KpiPanel";


type Props = {
    kpi: KpiTask
}

export function KpiTask({ kpi }: Props) {
    return (
        <div className="p-4 bg-white rounded-2xl shadow-lg flex flex-col items-center text-center">
            <h3 className="text-lg font-semibold text-gray-700">{kpi.title}</h3>
            <p className="text-2xl font-bold text-green-600">{kpi.value}</p>
            <span className="text-sm text-gray-500">{kpi.subtitle}: {kpi.subtitleValue}</span>
        </div>
    )
}