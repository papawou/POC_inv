import { KpiArray } from "../ui/kpi/KpiArray";
import { KpiPercent } from "../ui/kpi/KpiPercent";
import { KpiTask } from "../ui/kpi/KpiTask";
import { KpiNumeric } from "../ui/kpi/KpiNumeric";
import { useEffect, useState } from "react";
import { Loading } from "../ui/Loading";
import { isDef } from "../technical/isDef";
import { getKpis, Kpi } from "../api/kpi";

export function KpiPanel() {
    const [kpis, setKpis] = useState<Kpi[]>()

    useEffect(() => {
        getKpis().then(kpis => setKpis(kpis))
    }, []);

    if (!isDef(kpis)) {
        return <Loading />
    }

    return (
        <>
            {
                kpis.map((kpi) => {
                    switch (kpi.id) {
                        case 1:
                            return (
                                <KpiTask key={kpi.id} kpi={kpi} />
                            );
                        case 2:
                            return (
                                <KpiNumeric key={kpi.id} kpi={kpi} />
                            );
                        case 3:
                            return (
                                <KpiArray key={kpi.id} kpi={kpi} />
                            );
                        case 4:
                            return (
                                <KpiPercent key={kpi.id} kpi={kpi} />
                            );
                        default:
                            return null;
                    }
                })
            }
        </>
    );
}