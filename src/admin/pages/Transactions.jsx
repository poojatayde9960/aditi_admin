import { Icon } from "@iconify/react";
import React from "react";
import { FaSearch } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import { LuDownload } from "react-icons/lu";

const Transactions = () => {
  const data = [
    {
      id: "#TSN-12345",
      name: "Sarah Chen",
      phone: "+91 2020 202 202",
      method: "Visa******8989",
      amount: "$328,500",
      status: "Completed",
      statusColor: "bg-[#22FF0030] text-[#22FF00]",
      date: "20/12/2025",
      time: "10:00 AM",
    },
    {
      id: "#TSN-12345",
      name: "Sarah Chen",
      phone: "+91 2020 202 202",
      method: "Visa******8989",
      amount: "$328,500",
      status: "Failed",
      statusColor: "bg-[#AE000030] text-[#AE0000]",
      date: "20/12/2025",
      time: "10:00 AM",
    },
  ];

  return (
    <div className="p-2 md:p-5 lg:ml-23   bg-[#020523] text-[#BEBEBE] min-h-screen">
      {/* TITLE */}
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-manrope">Transactions</h1>
          <p className="text-gray-400 mt-1 font-manrope">Financial Transaction History</p>
        </div>

        <button className="flex items-center   gap-2 bg-[#FFFFFF1C]  border-white/10 h-10 w-28  rounded-lg hover:bg-[#141a3a] transition">
          <span className="flex gap-2  ml-3"><Icon icon="solar:export-broken" width="20" height="20" className="text-[#BEBEBE]" />
            Export</span>
        </button>
      </div>

      {/* TOP CARD */}
      <div className="mt-8 w-[330px] bg-[#0B1135] rounded-2xl border border-white/40  p-4 shadow-lg">
        <div className="flex justify-between items-start">
          {/* Icon */}
          <div className="w-14 h-14 bg-[#FFFFFF1C] rounded-xl flex items-center justify-center">
            <Icon
              icon="famicons:analytics"
              width="32"
              height="32"
              className="text-[#00D4FF]"
            />
          </div>


          {/* Percent */}
          <span className="bg-[#22FF0030] text-[#22FF00] px-2 py-1 rounded-xl text-sm font-semibold">
            +12.5 %
          </span>
        </div>

        <p className="mt-6 text-gray-400 text-sm">Total Revenue</p>
        <h2 className="text-3xl font-bold mt-2">$328,500</h2>
      </div>

      {/* SEARCH + FILTER + EXPORT */}
    <div className="items-center mt-10 p-4 border border-[#00D4FF0F] bg-[#0B1135] rounded-xl">
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
    {/* SEARCH BAR */}
    <div className="flex items-center gap-3 bg-[#0B1135] border border-[#00D4FF0F] px-4 py-3 rounded-xl w-full sm:max-w-md">
      <FaSearch className="text-gray-400" />
      <input
        type="text"
        placeholder="Search"
        className="bg-transparent outline-none w-full text-gray-300"
      />
    </div>

    {/* STATUS FILTER */}
    <button className="flex items-center gap-2 bg-[#0B1135] border border-white/40 px-5 py-3 rounded-xl w-full sm:w-auto text-gray-300 hover:bg-white/10 transition justify-center">
      <FiFilter className="text-xl" />
      All Status
      <span className="text-lg">▾</span>
    </button>
  </div>
</div>


      {/* TABLE */}
      <div className="mt-6 sm:mt-10 bg-[#0B1135] border border-[#FFFFFF4A] rounded-3xl overflow-x-auto">
        <table className="w-full min-w-[600px] text-left">
          <thead className="text-[#A19F9F] text-sm border-b border-white/10">
            <tr>
              <th className="py-4 px-4 sm:px-6 font-manrope">Transaction ID</th>
              <th className="py-4 px-4 sm:px-6 font-manrope">Customer</th>
              <th className="py-4 px-4 sm:px-6 font-manrope">Pay Method</th>
              <th className="py-4 px-4 sm:px-6 font-manrope">Amount</th>
              <th className="py-4 px-4 sm:px-6 font-manrope">Status</th>
              <th className="py-4 px-4 sm:px-6 font-manrope">Date</th>
              {/* <th className="py-4 px-4 sm:px-6 font-manrope">Action</th> */}
            </tr>
          </thead>

          <tbody className="text-gray-200 font-manrope text-sm sm:text-base">
            {data.map((t, index) => (
              <tr key={index} className="border-b border-white/5">
                <td className="py-4 px-4 sm:px-6">{t.id}</td>

                <td className="py-4 px-4 sm:px-6 flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#141A3A] rounded-full flex items-center justify-center text-[#00c8ff] font-manrope text-sm sm:text-base">
                    SC
                  </div>
                  <div>
                    <p>{t.name}</p>
                    <p className="text-gray-400 text-xs sm:text-sm">{t.phone}</p>
                  </div>
                </td>

                <td className="py-4 px-4 sm:px-6 text-gray-300">{t.method}</td>
                <td className="py-4 px-4 sm:px-6 text-[#22FF00]">{t.amount}</td>

                <td className="py-4 px-4 sm:px-6">
                  <span
                    className={`px-3 py-1 rounded-lg text-sm ${t.statusColor}`}
                  >
                    {t.status}
                  </span>
                </td>

                <td className="py-4 px-4 sm:px-6">
                  <p>{t.date}</p>
                  <p className="text-gray-400 text-xs sm:text-sm">{t.time}</p>
                </td>

                {/* <td className="py-4 px-4 sm:px-6">
                  <button className="text-[#00d2ff] hover:text-white text-lg sm:text-xl">
                    👁
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
















