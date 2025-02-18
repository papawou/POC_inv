import { KpiArray } from "./ui/kpi/KpiArray";
import { KpiPercent } from "./ui/kpi/KpiPercent";
import { KpiTask } from "./ui/kpi/KpiTask";
import { KpiNumeric } from "./ui/kpi/KpiNumeric";
import { useEffect, useState } from "react";
import { Loading } from "./ui/Loading";
import { isDef } from "./technical/isDef";


type KpiBase = {
    id: number;
    title: string;
};

export type KpiTask = KpiBase & {
    id: 1;
    value: string;
    subtitle: string;
    subtitleValue: string;
};

export type KpiNumeric = KpiBase & {
    id: 2;
    value: string;
};

export type KpiArray = KpiBase & {
    id: 3;
    value: { id: number; title: string }[];
};

export type KpiPercent = KpiBase & {
    id: 4;
    value: string;
};

type Kpi = KpiTask | KpiNumeric | KpiArray | KpiPercent;

export function KpiPanel() {
    const [kpis, setKpis] = useState<Kpi[]>()

    useEffect(() => {
        fetch("/data.json")
            .then((response) => response.json())
            .then((json) => setKpis(json))
            .catch((error) => console.error("Error fetching JSON:", error));
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