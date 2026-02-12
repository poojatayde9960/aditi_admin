import React from "react";
import { TrendingUp, ArrowUpDown } from "lucide-react";
import ConversionAndFuneral from "../components/ConversionAndFuneral";
import OverallVisitorTrends from "../components/OverallVisitorTrends";
import { IoAnalyticsSharp } from "react-icons/io5";

const Analytics = () => {
  const data = [
    {
      title: "Total Visitors",
      value: "328,500",
      icon:"IoAnalyticsSharp",
      percent: "+12.5 %",
    },
    {
      title: "Conversion Rate",
      value: "4.5 %",
      percent: "+12.5 %",
    },
    {
      title: "Total Revenue",
      value: "$328,500",
      percent: "+12.5 %",
    },
    {
      title: "Click Rate",
      value: "3.24%",
      percent: "+12.5 %",
    },
  ];

  return (
    <div className=" bg-[#020523] lg:ml-23 mt-5 font- text-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="-mt-15">
          <h1 className="text-3xl font-manrope ">Analytics</h1>
          <p className="text-gray-400 font-manrope  text-xs">
            Deep Insights Into Your Business Performance
          </p>
        </div>

        {/* Export Button */}
        <div className="mb-3">
          <button
            className="
            bg-[#0B1135] 
            border border-white/10 
            px-5 py-3
            rounded-xl 
            flex items-center gap-3 text-gray-200 hover:bg-[#0f1748]
            transition-all duration-300
          "
          >
            <ArrowUpDown size={18} />
            Export
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
        {data.map((item, idx) => (
          <div
            key={idx}
            className="
              bg-[#0B1135]
              border border-white/40
              rounded-2xl 
              p-3 
              shadow-[0_0_20px_rgba(0,0,0,0.25)]
              hover:shadow-[0_0_30px_rgba(0,0,0,0.35)]
              transition-all duration-300
              
            "
          >
            {/* Top Row */}
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-[#17204a] flex items-center justify-center shadow-inner">
                <IoAnalyticsSharp size={22} className="text-[#00d5ff]" />
              </div>

              <span className="text-xs bg-[#22FF0030] text-[#22FF00] px-3 py-2 rounded-xl">
                {item.percent}
              </span>
            </div>

            {/* Title */}
            <p className="text-gray-400 mt-4">{item.title}</p>

            {/* Value */}
            <h2 className="text-3xl font-semibold mt-2">{item.value}</h2>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <OverallVisitorTrends />
      </div>
      <div>
        <ConversionAndFuneral />
      </div>

    </div>
  );
};

export default Analytics;
