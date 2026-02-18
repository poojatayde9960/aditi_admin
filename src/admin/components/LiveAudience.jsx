import React from "react";

const countries = [
    { name: "United States", value: 142, percent: 70 },
    { name: "United Kingdom", value: 89, percent: 50 },
    { name: "France", value: 52, percent: 30 },
    { name: "Others", value: 11, percent: 10 },
];

const LiveAudience = ({ isLoading }) => {
    if (isLoading) {
        return (
            <div className="bg-[#FFFFFF0A] border border-white/10 rounded-2xl p-6 shadow-lg h-[360px] animate-pulse">
                <div className="h-6 bg-white/5 rounded w-1/3 mb-1"></div>
                <div className="h-4 bg-white/5 rounded w-1/4 mb-6"></div>
                <div className="text-center mb-8 space-y-2">
                    <div className="h-10 bg-white/5 rounded w-1/4 mx-auto"></div>
                    <div className="h-3 bg-white/5 rounded w-1/6 mx-auto"></div>
                </div>
                <div className="space-y-5">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="space-y-2">
                            <div className="flex justify-between">
                                <div className="h-3 bg-white/5 rounded w-1/3"></div>
                                <div className="h-3 bg-white/5 rounded w-12"></div>
                            </div>
                            <div className="h-2 bg-white/5 rounded-full w-full"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#FFFFFF0A] border font-manrope border-white/10 rounded-2xl p-6 shadow-lg h-full">
            <h3 className="text-white text-lg font-manrope mb-1">Live Audience</h3>
            <p className="text-gray-400 text-xs mb-6">Active users right now</p>

            <div className="text-center mb-8">
                <h2 className="text-white text-4xl  font-manrope">325</h2>
                <p className="text-green-400 text-xs mt-1">Active Sessions</p>
            </div>

            <div className="space-y-5">
                {countries.map((item) => (
                    <div key={item.name}>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400 font-manrope">{item.name}</span>
                            <span className="text-white font-medium font-manrope">{item.value}</span>
                        </div>
                        <div className="h-1.5 w-full bg-[#1e2746] rounded-full overflow-hidden">
                            <div
                                className="h-full font-manrope bg-[#00d5ff] rounded-full"
                                style={{ width: `${item.percent}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default LiveAudience;
