import React from "react";
import { FaSearch } from "react-icons/fa";
import { LuDownload } from "react-icons/lu";
import { FiFilter } from "react-icons/fi";
import { Icon } from "@iconify/react";

const Enquiries = () => {
  const enquiries = [
    {
      name: "Sarah Chen",
      email: "sarah@gmail.com",
      phone: "+91 8585 202 202",
      message: "Hi, I Haven’t Received My Order Yet. Can You Help?",
      status: "Contacted",
      statusColor: "bg-[#22FF0030] text-[#22FF00]",
      date: "20/12/2025",
      time: "10:00 AM",
      showButton: false,
    },
    {
      name: "Sarah Chen",
      email: "sarah@gmail.com",
      phone: "+91 8585 202 202",
      message: "Hi, I Haven’t Received My Order Yet. Can You Help?",
      status: "Pending",
      statusColor: "bg-[#D9FF0030] text-[#D9FF00]",
      date: "20/12/2025",
      time: "10:00 AM",
      showButton: true,
    },
  ];

  return (
    <div className=" md:p-2 lg:ml-23  bg-[#020523] text-white min-h-screen">
      {/* TITLE */}
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-manrope">Enquiries</h1>
          <p className="text-gray-400 text-xs mt-1 font-manrope">Recent Enquiries History</p>
        </div>
        <button className="flex items-center gap-2 bg-[#0B1135] border border-white/10 px-5 py-3 rounded-xl ml-4 text-gray-300 hover:bg-white/10 transition">
          <Icon icon="solar:export-broken" className="text-xl" />
          Export
        </button>
      </div>

      {/* TOP CARD */}
      <div className="mt-8 w-[330px] bg-[#0B1135] rounded-2xl border border-white/40 p-4">
        <div className="flex justify-between items-start">
          <div className="w-14 h-14 bg-[#141A3A] rounded-xl flex items-center justify-center">
            <Icon icon="tabler:message-filled" width="30" height="30" className="text-[#FFFFFF]" />
          </div>

          <span className="bg-[#22FF0030] text-[#22FF00] px-3 py-1 text-sm rounded-xl font-semibold">
            +12.5 %
          </span>
        </div>

        <p className="mt-6 text-gray-400 text-sm">Total Enquiries</p>
        <h2 className="text-3xl font-bold mt-2">520</h2>
      </div>

      {/* SEARCH + FILTER */}
      <div className="items-center mt-10 p-4 bg-[#0B1135] rounded-xl">
        <div className="flex justify-between items-center">
          {/* SEARCH BAR */}
          <div className="flex items-center gap-3 bg-[#0B1135] border border-white/40  px-4 py-3 rounded-xl w-full max-w-md">
            <FaSearch className="text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none w-full text-gray-300"
            />
          </div>

          {/* STATUS FILTER */}
          <button className="flex items-center gap-2 bg-[#0B1135] border border-white/40 px-5 py-3 rounded-xl ml-4 text-gray-300 hover:bg-white/10 transition">
            <FiFilter className="text-xl" />
            All Status
            <span className="text-lg">▾</span>
          </button>

          {/* EXPORT */}
        </div>
      </div>

      {/* ENQUIRIES TABLE */}
      <div className="mt-10 bg-[#0B1135] border border-white/40 rounded-3xl overflow-hidden">
        {/* Mobile friendly horizontal scroll wrapper */}
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[700px] table-auto">
            <thead className="text-gray-400 text-sm border-b border-white/10">
              <tr>
                <th className="py-4 px-6">Customer</th>
                <th className="py-4 px-6">Contact</th>
                <th className="py-4 px-6">Message</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6">Action</th>
              </tr>
            </thead>

            <tbody className="text-gray-200">
              {enquiries.map((e, index) => (
                <tr key={index} className="border-b border-white/5 align-top">
                  {/* CUSTOMER */}
                  <td className="py-6 px-6 flex items-center gap-3 whitespace-nowrap">
                    <div className="w-12 h-12 bg-[#141A3A] rounded-full flex items-center justify-center text-[#00c8ff] font-bold">
                      SC
                    </div>
                    <div>
                      <p>{e.name}</p>
                      <p className="text-gray-400 text-sm">{e.email}</p>
                    </div>
                  </td>

                  {/* CONTACT */}
                  <td className="py-6 px-6 text-gray-300 whitespace-nowrap">{e.phone}</td>

                  {/* MESSAGE */}
                  <td className="py-6 px-6 text-gray-300 max-w-xs break-words">
                    {e.message}
                  </td>

                  {/* STATUS */}
                  <td className="py-6 px-6 whitespace-nowrap">
                    <span className={`px-4 py-1 rounded-lg text-sm font-medium ${e.statusColor}`}>
                      {e.status}
                    </span>
                  </td>

                  {/* DATE */}
                  <td className="py-6 px-6 whitespace-nowrap">
                    <p className="text-[#FFFFFF]">{e.date}</p>
                    <p className="text-sm text-[#FFFFFF]">{e.time}</p>
                  </td>

                  {/* ACTION */}
                  <td className="py-6 px-6 whitespace-nowrap">
                      <button className="px-5 py-3 bg-[#FFFFFF1C] text-[#FFFFFF] rounded-2xl transition">
                         <Icon icon="material-symbols-light:delete-rounded" className="text-2xl text-red-700 h-7" />
                      </button>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Enquiries;
