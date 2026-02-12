
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useGetSaleByPercentQuery } from "../../Redux/Apis/dashboardApi";

const COLORS = ["#EBFFBF", "#0017FA", "#AE0000", "#D207FF", "#00D4FF"];

const SellsByPerfume = () => {
    const { data: apiData, isLoading } = useGetSaleByPercentQuery();

    const rawData =
        apiData?.data ||
        apiData?.result?.data ||
        apiData?.result ||
        [];

    const chartData = rawData.map((item, index) => ({
        name: item.name,
        value: Number(item.percentage), // IMPORTANT
        color: COLORS[index % COLORS.length],
    }));

    if (isLoading) {
        return <p className="text-white">Loading...</p>;
    }

    if (!chartData.length) {
        return <p className="text-gray-400">No data available</p>;
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
                                stroke="#0B1135"
                                strokeWidth={5}
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={index} fill={entry.color} />
                                ))}
                            </Pie>

                            <Tooltip
                                formatter={(value) => `${value}%`}
                                contentStyle={{
                                    backgroundColor: "#020523",
                                    borderColor: "#ffffff20",
                                    color: "#fff",
                                    borderRadius: "8px",
                                }}
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
                            <span className="text-gray-300">
                                {item.name}
                            </span>
                        </div>
                        <span className="text-gray-400 font-medium">
                            {item.value}%
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SellsByPerfume;
