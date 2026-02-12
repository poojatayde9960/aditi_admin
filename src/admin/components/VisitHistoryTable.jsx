import React from "react";
import { useGetAllVisitsQuery } from "../redux/adminApi/adminApi";

const StatusBadge = ({ status }) => {
  const styles = {
    Completed: "bg-[#6AFFA52E] text-green-600 border border-green-400",
    Scheduled: "bg-[#C8D7FF] text-blue-600 border border-blue-400",
  };
  return (
    <span
      className={`px-4 py-1 text-xs rounded-md font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
};

const TypeBadge = ({ type }) => {
  const style =
    type === "New"
      ? "bg-green-100 text-green-600 border border-green-400"
      : "bg-purple-100 text-purple-600 border border-purple-400";

  return (
    <span className={`px-4 py-1 text-xs rounded-md font-medium ${style}`}>
      {type}
    </span>
  );
};

const VisitHistoryTable = ({ searchQuery }) => {
  const { data: allVisits, isLoading, isError } = useGetAllVisitsQuery();
  console.log("Getting All Visit Data:", allVisits?.data);

  const allVisit = allVisits?.data || [];

  const filteredVisits = allVisit.filter((visit) => {
    const q = searchQuery?.toLowerCase() || "";

    return (
      visit.student_name?.toLowerCase().includes(q) ||
      visit.student_contact?.toLowerCase().includes(q) ||
      // visit.visit_purpose?.toLowerCase().includes(q) ||
      // visit.notes?.toLowerCase().includes(q) ||
      // visit.counsellor?.toLowerCase().includes(q) ||
      visit.status?.toLowerCase().includes(q) ||
      // visit.type?.toLowerCase().includes(q) ||
      visit.createdAt?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="bg-white rounded-3xl shadow-sm border p-2 md:p-0 md:mt-3">
      {/* Desktop / Tablet Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#DBE5FF] rounded-3xl text-black text-md">
              <th className="px-4 py-4 font-semibold">Student Name</th>
              <th className="px-4 py-3 font-semibold">Contact</th>
              <th className="px-4 py-3 font-semibold">Purpose</th>
              <th className="px-4 py-3 font-semibold">Notes</th>
              <th className="px-4 py-3 font-semibold">Type</th>
              <th className="px-4 py-3 font-semibold">Counsellor</th>
              <th className="px-4 py-3 font-semibold">Date</th>
              <th className="px-4 py-3 font-semibold">Status</th>
            </tr>
          </thead>

          <tbody className="text-black text-[14px]">
            {filteredVisits.length === 0 && (
              <tr>
                <td
                  colSpan="8"
                  className="text-center py-6 text-gray-500 font-medium"
                >
                  No Visit Yet
                </td>
              </tr>
            )}

            {filteredVisits.map((item, i) => (
              <tr key={i} className="border-b hover:bg-gray-50 transition-all">
                <td className="px-4 py-4">{item.student_name}</td>
                <td className="px-4 py-4 whitespace-pre-line">
                  {item.student_contact}
                </td>
                <td className="px-4 py-4">{item.visit_purpose}</td>
                <td className="px-4 py-4">{item.notes}</td>
                <td className="px-4 py-4">
                  <TypeBadge type={item.type} />
                </td>
                <td className="px-4 py-4">{item.counsellor}</td>
                <td className="px-4 py-4">{item.createdAt?.split("T")[0]}</td>
                <td className="px-4 py-4">
                  <StatusBadge status={item.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="space-y-4 md:hidden">
        {filteredVisits.map((item, i) => (
          <div key={i} className="border p-4 rounded-lg shadow-sm">
            <div className="flex justify-between">
              <h3 className="font-semibold text-gray-900">
                {item.student_name}
              </h3>
              <TypeBadge type={item.type} />
            </div>

            <p className="text-gray-600 text-sm mt-1">{item.student_contact}</p>

            <div className="mt-3 text-sm">
              <p>
                <strong>Purpose:</strong> {item.visit_purpose}
              </p>
              <p>
                <strong>Notes:</strong> {item.notes}
              </p>
              <p>
                <strong>Counsellor:</strong> {item.counsellor}
              </p>
              <p>
                <strong>Date:</strong> {item.createdAt?.split("T")[0]}
              </p>
            </div>

            <div className="mt-3">
              <StatusBadge status={item.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisitHistoryTable;
