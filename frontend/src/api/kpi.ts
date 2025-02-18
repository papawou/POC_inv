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

export async function getKpis(token: string): Promise<Kpi[]> {
    const res = await fetch("http://localhost:3000/kpi/data", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    return await res.json()
}