import React from "react";
import { Users, ShoppingBag, DollarSign, Activity } from "lucide-react";
import DashboardStatsCard from "../components/DashboardStatsCard";
import SalesPerformanceChart from "../components/SalesPerformanceChart";
import SellsByPerfume from "../components/SellsByPerfume";
import LiveAudience from "../components/LiveAudience";
import TopSellingAndOrders from "../components/TopSellingAndOrders"; // Keeping this for now, will refactor next if needed
import { Icon } from "@iconify/react";
import { useGetCardstatusQuery } from "../../Redux/Apis/dashboardApi";
const AdminDashboard = () => {

  const { data, isLoading } = useGetCardstatusQuery();
  // Precise data to match the screenshot curve
  const revenueData = [
    { uv: 12 }, { uv: 13 }, { uv: 14 }, { uv: 15 }, { uv: 18 }, { uv: 19 }, { uv: 20 }, { uv: 22 }, { uv: 26 }, { uv: 34 }, { uv: 38 }, { uv: 40 }
  ];

  /* 
     User requested "Add the graph exactly like it is in the screenshot, and apply it to all 4 cards."
     So we apply 'revenueData' to all cards to ensure identical visual appearance.
  */

  const stats = [
    {
      title: "Total Revenue",
      value: isLoading ? "Loading..." : `$${data?.data?.totalRevenue ?? 0}`,
      percent: "+12.5%",
      icon: "mdi:dollar",
      chartColor: "#00D4FF",
      chartData: revenueData
    },
    {
      title: "Orders",
      value: isLoading ? "Loading..." : data?.data?.totalOrders ?? 0,
      percent: "+12.5%",
      icon: "solar:bag-2-broken",
      chartColor: "#00d5ff",
      chartData: revenueData
    },
    {
      title: "Total Users",
      value: isLoading ? "Loading..." : data?.data?.totalUsers ?? 0,
      percent: "+12.5%",
      icon: "mage:users",
      chartColor: "#00d5ff",
      chartData: revenueData
    },
    {
      title: "Conversion Rate",
      value: "3.20%",
      percent: "+12.5%",
      icon: "famicons:analytics",
      chartColor: "#00d5ff",
      chartData: revenueData
    },
  ];


  return (
    <div className="min-h-screen lg:ml-23 overflow-hidden  text-white  pb-10">

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="font-manrope text-2xl ">Dashboard</h1>
        <p className="font-poppins text-gray-400 text-sm">Overview of performance and activity</p>


      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1  font-manrope  sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((item, index) => (
          <DashboardStatsCard
            key={index}
            filterId={` font-manrope  line-shadow-${index}`} // unique filter for each card
            {...item}
          />
        ))}

      </div>
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">

        {/* Sales Performance - थोडं छोटं */}
        <div className="lg:col-span-7 xl:col-span-6">
          <SalesPerformanceChart />
        </div>

        {/* Sells By Perfume - अजून छोटं */}
        <div className="lg:col-span-3 xl:col-span-3">
          <SellsByPerfume />
        </div>

        {/* Live Audience - मोठं */}
        <div className="lg:col-span-3 xl:col-span-3">
          <LiveAudience />
        </div>

      </div>



      {/* Bottom Lists Row */}
      <div className="">
        <TopSellingAndOrders />
      </div>

    </div>
  );
};

export default AdminDashboard;
