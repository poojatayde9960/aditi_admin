import React from "react";
    
const SalesBars = () => {
  return (
   <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 w-full">

      {/* ------------------ SALES PERFORMANCE ------------------ */}
      <div className="bg-[#0B1135] p-6 rounded-2xl border border-white/40 shadow-xl">
        <h2 className="text-2xl font-semibold text-white">Sales Performance</h2>
        <p className="text-gray-400 text-sm mb-6">Revenue & orders over time</p>

        {/* Fake chart (CSS-based) */}
        <div className="h-[300px] w-full relative">
          <div className="absolute inset-x-0 top-20 h-[3px] bg-[#00d5ff] rounded-full blur-[2px]"></div>
          <div className="absolute inset-x-0 top-40 h-[3px] bg-[#00eaff] rounded-full blur-[2px]"></div>
        </div>
      </div>

      {/* ------------------ DONUT CHART (Sells By Perfume) ------------------ */}
      <div className="bg-[#0B1135] p-6 rounded-2xl border border-white/40 shadow-xl">
        <h2 className="text-2xl font-semibold text-white">Sells By Perfume</h2>

        <div className="flex items-center justify-between mt-6">
          {/* Fake donut chart */}
          <div className="w-40 h-40 rounded-full border-[14px] border-[#eaffc7] border-t-[#002aff] border-l-[#ff4b4b] border-b-[#00eaff] rotate-[30deg]"></div>

          {/* Legend */}
          <div className="text-white text-sm space-y-2">
            <p><span className="inline-block w-3 h-3 bg-[#eaffc7] rounded-full mr-2"></span>Aditi — 40%</p>
            <p><span className="inline-block w-3 h-3 bg-[#002aff] rounded-full mr-2"></span>Perfection — 20%</p>
            <p><span className="inline-block w-3 h-3 bg-[#ff4b4b] rounded-full mr-2"></span>Strength — 20%</p>
            <p><span className="inline-block w-3 h-3 bg-[#d554ff] rounded-full mr-2"></span>Harmony — 10%</p>
            <p><span className="inline-block w-3 h-3 bg-[#00eaff] rounded-full mr-2"></span>Wisdom — 10%</p>
          </div>
        </div>
      </div>

      {/* ------------------ LIVE AUDIENCE ------------------ */}
      <div className="bg-[#0B1135] p-6 rounded-2xl border border-white/40 shadow-xl">
        <h2 className="text-2xl font-semibold text-white">Live Audience</h2>
        <p className="text-gray-400 text-sm mb-4">Active users right now</p>

        <h1 className="text-5xl font-semibold text-white">325</h1>
        <p className="text-gray-400 text-sm mb-6">Active Sessions</p>

        {/* Country list */}
        <div className="space-y-4">
          <AudienceRow name="United States" value={142} />
          <AudienceRow name="United Kingdom" value={89} />
          <AudienceRow name="France" value={52} />
          <AudienceRow name="Others" value={11} />
        </div>
      </div>
    </div>
  );
};

const AudienceRow = ({ name, value }) => (
  <div>
    <div className="flex justify-between text-white text-sm mb-1">
      <span>{name}</span>
      <span>{value}</span>
    </div>
    <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
      <div
        className="h-full bg-[#00eaff] rounded-full"
        style={{ width: `${(value / 150) * 100}%` }}
      ></div>
    </div>
  </div>
);

export default SalesBars;
