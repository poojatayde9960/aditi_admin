
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { useGetSaleByMonthlyQuery } from "../../Redux/Apis/dashboardApi";

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const SalesPerformanceChart = () => {
  const { data: saleByMonthlyData, isLoading } = useGetSaleByMonthlyQuery();

  // ✅ API → Chart data conversion
  const chartData =
    saleByMonthlyData?.data
      ?.map(item => ({
        name: monthNames[item.month - 1],
        unitsSold: item.unitsSold
      }))
      .reverse() || [];

  if (isLoading) {
    return (
      <div className="bg-[#FFFFFF0A] border border-white/10 rounded-2xl p-6 shadow-lg h-[360px] animate-pulse">
        <div className="h-6 bg-white/5 rounded w-1/4 mb-1"></div>
        <div className="h-4 bg-white/5 rounded w-1/2 mb-6"></div>
        <div className="flex-1 flex flex-col justify-end space-y-6 py-1 h-[220px]">
          <div className="h-full bg-white/5 rounded w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFFFF0A] border border-white/10 rounded-2xl p-6 shadow-lg h-full">
      <h3 className="text-white text-lg font-semibold mb-1"></h3>
      <p className="text-gray-400 text-xs mb-6">Revenue & orders over time</p>

      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00d5ff" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#00d5ff" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />

            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 12 }}
              dy={10}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 12 }}
              dx={-10}
            />

            <Tooltip
              contentStyle={{ backgroundColor: "#020523", borderColor: "#ffffff20", color: "#fff" }}
              itemStyle={{ color: "#00d5ff" }}
            />

            <Line
              type="monotone"
              dataKey="unitsSold"
              stroke="#00d5ff"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, fill: "#00d5ff", stroke: "#fff", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesPerformanceChart;
