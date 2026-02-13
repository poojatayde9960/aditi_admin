import React from "react";
import { FaSearch } from "react-icons/fa";
import { LuDownload } from "react-icons/lu";
import { FiFilter } from "react-icons/fi";
import { Icon } from "@iconify/react";
import { useEnquiryDeleteMutation, useEnquiryStatusMutation, useGetEnquiryQuery } from "../../Redux/Apis/enquiryApi";

const Enquiries = () => {
  const { data, isLoading, isError } = useGetEnquiryQuery();
  const [deleteEnquiry, { isLoading: deleting }] = useEnquiryDeleteMutation()
  const [updateStatus, { isLoading: updating }] = useEnquiryStatusMutation();
  const [statusFilter, setStatusFilter] = React.useState("All");
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [loadingId, setLoadingId] = React.useState(null);
  const [deletingId, setDeletingId] = React.useState(null);

  const enquiries = data?.data?.map((item) => {
    const dateObj = new Date(item.createdAt);

    return {
      id: item._id,
      name: item.name,
      email: item.email,
      phone: item.contact,
      message: "Customer enquiry received",
      status: item.status?.trim(),
      date: dateObj.toLocaleDateString("en-IN"),
      time: dateObj.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  }) || [];
  const filteredEnquiries =
    statusFilter === "All"
      ? enquiries
      : enquiries.filter((e) => e.status === statusFilter);
  {
    isLoading && (
      <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto mt-6">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-slate-700 h-10 w-10"></div>

          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-slate-700 rounded"></div>

            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                <div className="h-2 bg-slate-700 rounded col-span-1"></div>
              </div>

              <div className="h-2 bg-slate-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  { isError && <p className="text-red-500">Failed to load enquiries</p> }


  return <>

    {/* <pre className="ml-20">{JSON.stringify(data, null, 2)}</pre> */}

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
          <div className="relative ml-4">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center gap-2 bg-[#0B1135] border border-white/40 px-5 py-3 rounded-xl text-gray-300 hover:bg-white/10 transition"
            >
              <FiFilter className="text-xl" />
              {statusFilter}
              <span className="text-lg">▾</span>
            </button>

            {filterOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-[#0B1135] border border-white/20 rounded-xl shadow-lg overflow-hidden z-50">
                {["All", "Pending", "Contacted"].map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      setStatusFilter(status);
                      setFilterOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-sm hover:bg-white/10 transition ${statusFilter === status ? "text-cyan-400" : "text-gray-300"
                      }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>


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
              {filteredEnquiries.map((e, index) => (

                <tr key={index} className="border-b border-white/5 align-top">
                  {/* CUSTOMER */}
                  <td className="py-6 px-6 flex items-center gap-3 whitespace-nowrap">
                    <div className="w-12 h-12 bg-[#141A3A] rounded-full flex items-center justify-center text-[#00c8ff] font-bold">
                      {e.name?.slice(0, 2).toUpperCase()}
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
                  {/* <td className="py-6 px-6 whitespace-nowrap">
                    <span className={`px-4 py-1 rounded-lg text-sm font-medium ${e.statusColor}`}>
                      {e.status}
                    </span>
                  </td> */}
                  <td className="py-6 px-6 whitespace-nowrap flex gap-2">
                    {e.status === "Pending" ? (
                      <button
                        onClick={() => {
                          setLoadingId(e.id);
                          updateStatus({ id: e.id })
                            .unwrap()
                            .finally(() => setLoadingId(null));
                        }}
                        disabled={loadingId === e.id}
                        className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 text-white rounded-xl text-sm"
                      >
                        {loadingId === e.id ? "Updating..." : "Mark as Contacted"}
                      </button>

                    ) : (
                      <span className="text-green-400 text-sm font-medium flex items-center gap-1">
                        ✔ Contacted
                      </span>
                    )}
                  </td>


                  {/* DATE */}
                  <td className="py-6 px-6 whitespace-nowrap">
                    <p className="text-[#FFFFFF]">{e.date}</p>
                    <p className="text-sm text-[#FFFFFF]">{e.time}</p>
                  </td>

                  {/* ACTION */}
                  <td className="py-6 px-6 whitespace-nowrap">
                    <button
                      onClick={() => {
                        if (window.confirm("Are you sure you want to delete this enquiry?")) {
                          setDeletingId(e.id);
                          deleteEnquiry({ id: e.id })
                            .unwrap()
                            .finally(() => setDeletingId(null));
                        }
                      }}
                      disabled={deletingId === e.id}
                      className="px-5 py-3 bg-[#FFFFFF1C] hover:bg-red-600/30 disabled:opacity-50 text-[#FFFFFF] rounded-2xl transition"
                    >
                      {deletingId === e.id ? (
                        "Deleting..."
                      ) : (
                        <Icon
                          icon="material-symbols-light:delete-rounded"
                          className="text-2xl text-red-500 h-7"
                        />
                      )}
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </>
};

export default Enquiries;
