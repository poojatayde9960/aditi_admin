import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useGetSaleByPercentQuery } from "../../Redux/Apis/dashboardApi";

const COLORS = ["#EBFFBF", "#0017FA", "#AE0000", "#D207FF", "#00D4FF"];

const SellsByPerfume = () => {
    const { data: apiData, isLoading } = useGetSaleByPercentQuery();

    const rawData = apiData?.data || [];

    // Merge duplicate perfumes
    const mergedData = rawData.reduce((acc, item) => {
        const existing = acc.find((p) => p.name === item.name);
        if (existing) {
            existing.unitsSold += item.unitsSold || 0;
        } else {
            acc.push({
                ...item,
                unitsSold: item.unitsSold || 0,
            });
        }
        return acc;
    }, []);

    const totalUnits = mergedData.reduce(
        (sum, item) => sum + item.unitsSold,
        0
    );

    const chartData = mergedData.map((item, index) => {
        const realPercentage =
            totalUnits > 0
                ? ((item.unitsSold / totalUnits) * 100).toFixed(2)
                : 0;

        return {
            name: item.name,
            value: totalUnits > 0 ? Number(realPercentage) : 1, // 👈 fake equal slice if no sales
            displayValue: realPercentage, // 👈 legend & tooltip sathi
            color: COLORS[index % COLORS.length],
        };
    });

    if (isLoading) {
        return <p className="text-white">Loading...</p>;
    }

    return (
        <div className="bg-[#FFFFFF0A] border font-manrope border-white/10 rounded-2xl p-6 shadow-lg h-full flex flex-col">
            <h3 className="text-white text-lg font-semibold mb-4">
                Sells By Perfume
            </h3>

            <div className="flex-1 flex items-center justify-center">
                <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                dataKey="value"
                                paddingAngle={3}
                                fill="#FFFFFF"
                                stroke="#0B1135"
                                strokeWidth={5}
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={index} fill={entry.color} />
                                ))}
                            </Pie>

                            <Tooltip
                                formatter={(value, name, props) => [
                                    `${props.payload.displayValue}%`,
                                    props.payload.name
                                ]}
                                contentStyle={{
                                    backgroundColor: "#020523",
                                    borderColor: "#ffffff20",
                                    borderRadius: "8px",
                                }}
                                itemStyle={{ color: "#FFFFFF" }}
                                labelStyle={{ color: "#FFFFFF" }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Legend */}
            <div className="mt-4 space-y-2">
                {chartData.map((item) => (
                    <div
                        key={item.name}
                        className="flex items-center justify-between text-sm"
                    >
                        <div className="flex items-center gap-2">
                            <div
                                className="w-2.5 h-2.5 rounded-full"
                                style={{ backgroundColor: item.color }}
                            />
                            <span className="text-white">
                                {item.name}
                            </span>
                        </div>
                        <span className="text-gray-400 font-medium">
                            {item.displayValue}%
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SellsByPerfume;