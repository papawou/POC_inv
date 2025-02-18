type Kpi = {
    
}

export function Kpi() {
    return (
        <div className="p-4 bg-white rounded-2xl shadow-lg flex flex-col items-center text-center">
            <h3 className="text-lg font-semibold text-gray-700">Revenue</h3>
            <p className="text-2xl font-bold text-green-600">$25,000</p>
            <span className="text-sm text-gray-500">+10% from last month</span>
        </div>
    );
}
