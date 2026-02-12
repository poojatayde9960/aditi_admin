import React from "react";
import { Users } from "lucide-react";
import UserList from "../components/UserList";

import {
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import { useGetUsersQuery } from "../../Redux/Apis/usersApi";

const UserManagementSkeleton = () => {
  return (
    <div className="bg-[#020523] lg:ml-23 text-white min-h-screen animate-pulse">
      {/* Header */}
      <div className="h-8 w-32 bg-[#11183C] rounded mb-2"></div>
      <div className="h-3 w-48 bg-[#11183C] rounded mb-8"></div>

      {/* Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((_, i) => (
          <div
            key={i}
            className="bg-[#070D2B] rounded-2xl px-6 py-5 h-[85%] border border-[#FFFFFF0A]"
          >
            {/* Icon + Badge */}
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-[#11183C] rounded-xl"></div>
              <div className="h-5 w-28 bg-[#11183C] rounded-lg"></div>
            </div>

            {/* Title */}
            <div className="h-4 w-32 bg-[#11183C] rounded mt-6"></div>

            {/* Value */}
            <div className="h-10 w-24 bg-[#11183C] rounded mt-3"></div>

            {/* Sparkline */}
            <div className="h-[70px] w-full bg-[#11183C] rounded mt-5"></div>
          </div>
        ))}
      </div>

      {/* Table Skeleton */}
      <div className="mt-10 bg-[#070D2B] rounded-xl p-6">
        {[1, 2, 3, 4, 5].map((_, i) => (
          <div
            key={i}
            className="h-6 w-full bg-[#11183C] rounded mb-4"
          ></div>
        ))}
      </div>
    </div>
  );
};

const sparkData = {
  totalUsers: [
    { pv: 10 }, { pv: 14 }, { pv: 18 }, { pv: 22 }, { pv: 21 }, { pv: 23 },
  ],
  newThisWeek: [
    { pv: 12 }, { pv: 17 }, { pv: 26 }, { pv: 32 }, { pv: 28 }, { pv: 24 },
  ],
  avgOrders: [
    { pv: 11 }, { pv: 15 }, { pv: 14 }, { pv: 18 }, { pv: 20 }, { pv: 25 },
  ],
};
const MiniSparkline = ({ data }) => {
  return (
    <div className="w-full h-[70px] mt-5">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <defs>
            <linearGradient id="neon" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#00E5FF" />
              <stop offset="100%" stopColor="#00CFFF" />
            </linearGradient>
          </defs>

          <Line
            type="monotone"
            dataKey="pv"
            stroke="url(#neon)"
            strokeWidth={4}
            dot={false}
            animationDuration={900}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const UserManagement = () => {
  const { data: userData, isLoading, isError } = useGetUsersQuery();

if (isLoading) return <UserManagementSkeleton />;
  if (isError) return <p>Something went wrong!</p>;

  const users = userData?.users || [];

  const today = new Date();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(today.getDate() - 7);
  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(today.getDate() - 14);

  // Users this week & last week
  const usersThisWeek = users.filter(u => new Date(u.createdAt) >= oneWeekAgo);


  const totalUsers = users.length;

  const newThisWeek = usersThisWeek.length;

  const avgOrders = users.length
    ? users.reduce((sum, u) => sum + (u.totalOrders || 0), 0) / users.length
    : 0;


  // Generate sparkline data for chart
  // const generateSparkData = (base) =>
  //   Array.from({ length: 6 }, (_, i) => ({ pv: Math.max(base + Math.floor(Math.random() * 5 - 2), 0) }));


  const stats = [
    {
      title: "Total Users",
      value: totalUsers.toLocaleString(),
      percent: "+12.5 % From Last Month",
      percentColor: "#22FF0030",
      data: sparkData.totalUsers,
    },
    {
      title: "New This Week",
      value: newThisWeek.toLocaleString(),
      percent: "+12.5 % From Last Month",
      percentColor: "#22FF0030",
      data: sparkData.newThisWeek,
    },
    {
      title: "Average Orders",
      value: avgOrders.toFixed(1),
      percent: "-12.5 % From Last Month",
      percentColor: "#AE000026",
      data: sparkData.avgOrders,
    },
  ];

  return (
    <div className=" bg-[#020523] lg:ml-23 text-white min-h-screen">
      {/* Page Header */}
      <h1 className="text-3xl font-manrope">Users</h1>
      <p className="text-gray-400 text-xs font-manrope mb-8">
        Manage Your Customer Base
      </p>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 -mt-4 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="
              bg-[#070D2B]
              rounded-2xl
              px-6 py-5 h-[85%]
              shadow-[#FFFFFF0A]
              border-2 border-[#FFFFFF0A]
            "
          >
            {/* ICON + % BADGE */}
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-[#11183C] rounded-xl flex justify-center items-center">
                <Users size={26} className="text-[#00DEFF]" />
              </div>
              <span
                className="text-xs px-3 py-1 mb-3 rounded-lg"
                style={{
                  backgroundColor: item.percentColor,
                  color: item.percent.includes("-") ? "#FF4D4D" : "#22FF00",
                }}
              >
                {item.percent}
              </span>
            </div>

            {/* TITLE */}
            <p className="text-gray-400 text-sm mt-4">{item.title}</p>

            {/* VALUE */}
            <h2 className="text-4xl font-manrope text-[#FFFFFF] mt-1">{item.value}</h2>

            {/* REAL NEON GRAPH */}
            <MiniSparkline data={item.data} />
          </div>
        ))}
      </div>

      {/* User Table Component */}
      <UserList />
    </div>
  );
};

export default UserManagement;