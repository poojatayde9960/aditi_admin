import React from "react";
import { Users, ShoppingBag, DollarSign, Activity } from "lucide-react";
import DashboardStatsCard from "../components/DashboardStatsCard";
import SalesPerformanceChart from "../components/SalesPerformanceChart";
import SellsByPerfume from "../components/SellsByPerfume";
import LiveAudience from "../components/LiveAudience";
import TopSellingAndOrders from "../components/TopSellingAndOrders"; // Keeping this for now, will refactor next if needed
import { Icon } from "@iconify/react";
import { useGetCardstatusQuery, useGetUserConversionRateQuery } from "../../Redux/Apis/dashboardApi";
const DashboardSkeleton = () => (
  <div className="bg-[#FFFFFF0A] border border-white/10 rounded-[2rem] p-6 h-[220px] w-full mx-auto">
    <div className="animate-pulse flex flex-col justify-between h-full">
      {/* Top Section */}
      <div className="flex justify-between items-start">
        <div className="rounded-2xl bg-white/5 h-14 w-14"></div>
        <div className="rounded-xl bg-white/5 h-8 w-20"></div>
      </div>

      {/* Middle Section */}
      <div className="space-y-3">
        <div className="h-4 bg-white/5 rounded w-1/3"></div>
        <div className="h-10 bg-white/5 rounded w-2/3"></div>
      </div>

      {/* Bottom section (Graph area) */}
      <div className="h-16 bg-white/5 rounded-xl w-full"></div>
    </div>
  </div>
);

const AdminDashboard = () => {

  const { data, isLoading } = useGetCardstatusQuery();
  const { data: conversionRateData, isLoading: isConversionRateLoading } = useGetUserConversionRateQuery();

  const isAnyLoading = isLoading || isConversionRateLoading;

  // Precise data to match the screenshot curve
  const revenueData = [
    { uv: 12 }, { uv: 13 }, { uv: 14 }, { uv: 15 }, { uv: 18 }, { uv: 19 }, { uv: 20 }, { uv: 22 }, { uv: 26 }, { uv: 34 }, { uv: 38 }, { uv: 40 }
  ];

  const stats = [
    {
      title: "Total Revenue",
      value: `$${data?.data?.totalRevenue ?? 0}`,
      percent: "+12.5%",
      icon: "mdi:dollar",
      chartColor: "#00D4FF",
      chartData: revenueData
    },
    {
      title: "Orders",
      value: data?.data?.totalOrders ?? 0,
      percent: "+12.5%",
      icon: "solar:bag-2-broken",
      chartColor: "#00d5ff",
      chartData: revenueData
    },
    {
      title: "Total Users",
      value: data?.data?.totalUsers ?? 0,
      percent: "+12.5%",
      icon: "mage:users",
      chartColor: "#00d5ff",
      chartData: revenueData
    },
    {
      title: "Conversion Rate",
      value: conversionRateData?.conversionRate ?? "0%",
      percent: "+12.5%",
      icon: "famicons:analytics",
      chartColor: "#00d5ff",
      chartData: revenueData
    },
  ];


  return <>

    {/* <pre className="ml-20">{JSON.stringify(conversionRateData, null, 2)}</pre> */}


    <div className="min-h-screen text-white">

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="page-header-title">Dashboard</h1>
        <p className="font-poppins text-gray-400 text-sm">Overview of performance and activity</p>


      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 font-manrope sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {isAnyLoading
          ? Array.from({ length: 4 }).map((_, index) => <DashboardSkeleton key={index} />)
          : stats.map((item, index) => (
            <DashboardStatsCard
              key={index}
              filterId={`font-manrope line-shadow-${index}`} // unique filter for each card
              {...item}
            />
          ))}
      </div>
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">

        {/* Sales Performance - */}
        <div className="lg:col-span-7 xl:col-span-6">
          <SalesPerformanceChart />
        </div>

        {/* Sells By Perfume -  */}
        <div className="lg:col-span-3 xl:col-span-3">
          <SellsByPerfume />
        </div>

        {/* Live Audience -  */}
        <div className="lg:col-span-3 xl:col-span-3">
          <LiveAudience isLoading={isAnyLoading} />
        </div>

      </div>



      {/* Bottom Lists Row */}
      <div className="">
        <TopSellingAndOrders />
      </div>

    </div>
  </>
};

export default AdminDashboard;
