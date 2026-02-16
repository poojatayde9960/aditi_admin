import React from "react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { Icon } from "@iconify/react";

const DashboardStatsCard = ({ title, value, icon, percent, chartColor, chartData, filterId }) => {

    return (
        <div className="relative bg-[#FFFFFF0A] border border-cyan-200  rounded-3xl p-6 
    overflow-hidden shadow-lg group hover:shadow-2xl transition-all duration-300 
    min-h-[220px] flex flex-col justify-between">

            {/* Top Section */}
            <div className="flex  justify-between items-start z-10 relative">
                <div className="h-14 w-14 bg-[#FFFFFF1C] rounded-2xl flex items-center justify-center text-white shadow-inner">
                    <Icon icon={icon} width={28} height={28} className="text-[#00d5ff]" />
                </div>
                <span className="bg-[#22FF0030] text-[#22FF00] text-sm font-semibold px-3 py-1.5 rounded-xl flex items-center">
                    {percent}
                </span>
            </div>

            {/* Middle Section */}
            <div className="z-10 mb-5 relative">
                <p className="text-gray-400 -mt-20 text-sm font-medium mb-1 tracking-wide">{title}</p>
                <h3 className="text-white text-4xl font-manrope">{value}</h3>
            </div>

            {/* Graph */}
            <div className="absolute p-3 bottom-0 left-0 right-0 h-24 z-0">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData || []}>
                        <defs>
                            <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
                                <feDropShadow
                                    dx="0"
                                    dy="2"
                                    stdDeviation="4"
                                    floodColor={chartColor || "#00d5ff"}
                                    floodOpacity="0.7"
                                />
                            </filter>
                        </defs>
                        <Area
                            type="monotone"
                            dataKey="uv"
                            stroke={chartColor || "#00d5ff"}
                            strokeWidth={4}
                            fill="none"
                            strokeLinecap="round"
                            filter={`url(#${filterId})`}
                        />

                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default DashboardStatsCard;
