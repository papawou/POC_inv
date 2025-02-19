import { updateJwt } from "../technical/jwt";

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

export type Kpi = KpiTask | KpiNumeric | KpiArray | KpiPercent;

export async function getKpis(): Promise<Kpi[]> {
    const res = await fetch("http://localhost:3000/kpi/data", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("jwt")}`
        },
    });

    if (!res.ok) {
        if (res.status === 401) {
            updateJwt(null)
        }
        throw res
    }

    return await res.json()
}