import React from "react";
import { Icon } from "@iconify/react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

const data = [
    { name: "Jan 1", pageviews: 20000, visitors: 12000 },
    { name: "Jan 2", pageviews: 26000, visitors: 15000 },
    { name: "Jan 3", pageviews: 32000, visitors: 23000 },
    { name: "Jan 4", pageviews: 41000, visitors: 20000 },
    { name: "Jan 5", pageviews: 45000, visitors: 25000 },
    { name: "Jan 6", pageviews: 38000, visitors: 28000 },
    { name: "Jan 7", pageviews: 34000, visitors: 26000 },
    { name: "Jan 8", pageviews: 36000, visitors: 24000 },
    { name: "Jan 9", pageviews: 37000, visitors: 23000 },
    { name: "Jan 10", pageviews: 39000, visitors: 27000 },
    { name: "Jan 11", pageviews: 42000, visitors: 30000 },
    { name: "Jan 12", pageviews: 46000, visitors: 33000 },
    { name: "Jan 13", pageviews: 48000, visitors: 35000 },
];

// Custom tooltip - same to same like screenshot
const CustomTooltip = ({ payload, label, active }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#0B0F2A] text-white px-4 py-2 rounded-lg shadow-lg border border-[#2d2f55]">
                <p className="text-sm font-semibold">{label}</p>
                <p className="text-xs text-cyan-300">
                    Pageviews : {payload[0].value}
                </p>
                <p className="text-xs text-pink-300">
                    Visitors : {payload[1].value}
                </p>
            </div>
        );
    }
    return null;
};

const OverallVisitorTrends = () => {
    return (
        <div className="w-full bg-[#0B1135] rounded-2xl border border-[#1D2349] p-6 shadow-xl">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div className="-mt-3">
                    <h2 className="text-white font-manrope text-xl ">
                        Overall Visitor Trends
                    </h2>
                    <h1 className="text-[#BEBEBE] font-manrope text-xs ">
                        Daily visitors and page views
                    </h1>

                </div>
                <div className="flex gap-6 text-sm font-manrope">
                    <span className="flex items-center gap-2 text-cyan-300 relative">

                        <Icon
                            icon="tabler:circuit-cell"
                            width="24"
                            height="24"
                            className="absolute left-0 top-1/2 -translate-y-1/2 text-cyan-300"
                        />

                        <span className="pl-8">Pageviews</span>
                    </span>
                    <span className="flex items-center gap-2 text-pink-300 relative">

                        <Icon
                            icon="tabler:circuit-cell"
                            width="24"
                            height="24"
                            className="absolute left-0 top-1/2 -translate-y-1/2 text-pink-400"
                        />

                        <span className="pl-8">Visitors</span>
                    </span>


                </div>
            </div>

            {/* Chart */}
            <div className="w-full h-[360px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <defs>
                            <linearGradient id="cyanLine" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#00E5FF" />
                                <stop offset="100%" stopColor="#00B7FF" />
                            </linearGradient>

                            <linearGradient id="pinkLine" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#FF4DFF" />
                                <stop offset="100%" stopColor="#C43CFF" />
                            </linearGradient>
                        </defs>

                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#1A204A"
                            vertical={false}
                        />

                        <XAxis
                            dataKey="name"
                            stroke="#7582A8"
                            tick={{ fill: "#8E9BC9", fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            stroke="#7582A8"
                            tick={{ fill: "#8E9BC9", fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#2F3568" }} />

                        <Line
                            type="monotone"
                            dataKey="pageviews"
                            stroke="url(#cyanLine)"
                            strokeWidth={3}
                            dot={false}
                            activeDot={{ r: 5, fill: "#00E5FF" }}
                        />

                        <Line
                            type="monotone"
                            dataKey="visitors"
                            stroke="url(#pinkLine)"
                            strokeWidth={3}
                            dot={false}
                            activeDot={{ r: 5, fill: "#FF4DFF" }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default OverallVisitorTrends;
