import React, { useState } from "react";
import { Search, Filter, Eye, X } from "lucide-react";
import { IoGift } from "react-icons/io5";
import { useGetUsersQuery } from "../../Redux/Apis/usersApi";
import { Link } from "react-router-dom";
import { useAdminGiftAssignMutation, useGetGiftsQuery, useGiftGetByIdQuery } from "../../Redux/Apis/giftsApi";

const UserList = () => {
  const { data, isLoading, isError } = useGetUsersQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [adminGiftAssign, { isLoading: isAssigningGift }] = useAdminGiftAssignMutation();
  const { data: giftsData, isLoading: isLoadingGiftsData, isError: isErrorGiftsData } = useGetGiftsQuery();
  const [isGiftOpen, setIsGiftOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedGift, setSelectedGift] = useState(null);
  const [giftReason, setGiftReason] = useState('');

  const getInitials = (fullName) =>
    fullName
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!</p>;
  const handleSendGift = async () => {
    if (!selectedGift || !giftReason || !selectedUser) return;

    try {
      await adminGiftAssign({
        giftId: selectedGift._id,
        userId: [selectedUser.id],   // backend la array pahije
        Reasonforgift: giftReason
      }).unwrap();

      alert("Gift Sent Successfully ✅");

      // reset state
      setIsGiftOpen(false);
      setSelectedGift(null);
      setGiftReason("");

    } catch (error) {
      console.error("Gift assign error:", error);
      alert("Failed to send gift ❌");
    }
  };
  const students =
    data?.users?.map((user) => ({
      id: user._id,
      name: user.name || "N/A",
      email: user.email || "N/A",
      location:
        user.addresses?.length > 0
          ? `${user.addresses[0].city}, ${user.addresses[0].country}`
          : "N/A",
      contact: user.phone || user.addresses?.[0]?.phone || "N/A",
      orders: user.totalOrders || 0,
      status: "Active",
      date: user.createdAt
        ? new Date(user.createdAt).toLocaleDateString()
        : "N/A",
      spent: `$${user.totalSpent || 0}`,
    })) || [];

  // 🔍 SEARCH LOGIC (no UI change)
  const filteredStudents = students.filter((item) =>
    `${item.name} ${item.email} ${item.location} ${item.contact}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#020523] min-h-screen text-white ">
      {/* Search + Filter */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-[#0B1135] p-3 rounded-lg">
        <div className="bg-[#020523] border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3 w-full md:w-[400px]">
          <Search size={20} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent focus:outline-none text-gray-200 w-full"
          />
        </div>


      </div>

      {/* TABLE */}
      <div className="bg-[#0B1135] rounded-2xl border border-white/10 p-4 mt-8 overflow-x-auto">
        <div className="min-w-[1100px] ">

          {/* Header */}
          <div className="grid grid-cols-8 text-gray-300 text-sm px-6 py-4 border-b border-white/20">
            <span className="col-span-2">Customer</span>
            <span>Location</span>
            <span>Contact</span>
            <span>Orders</span>
            <span>Joined</span>
            <span>Total Spent</span>
            <span className="text-center">Action</span>
          </div>

          {/* Rows */}
          {filteredStudents.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-8 px-6  py-5 border-b border-white/10 text-gray-200 items-center"
            >
              {/* Customer */}
              <div className="col-span-2 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  {getInitials(item.name)}
                </div>
                <div>
                  <p className="text-sm">{item.name}</p>
                  <p className="text-xs text-gray-400">{item.email}</p>
                </div>
              </div>

              <span className="text-xs">{item.location}</span>
              <span className="text-xs">{item.contact}</span>
              <span className="text-xs">{item.orders}</span>
              <span className="text-xs">{item.date}</span>

              <span className="text-green-400 text-xs">
                {item.spent}
              </span>

              <div className="flex justify-center gap-3 text-[#00eaff] cursor-pointer">
                <Link to={`/admin/customer-detail/${item.id}`}>
                  <Eye size={20} />
                </Link>

                <IoGift
                  size={20}
                  onClick={() => {
                    setSelectedUser(item);
                    setIsGiftOpen(true);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* 🔥 SEND GIFT MODAL */}
      {isGiftOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-2xl bg-gradient-to-br from-[#050b2e] to-[#020617] p-6 shadow-2xl relative">

            {/* Close */}
            <button
              onClick={() => {
                setIsGiftOpen(false);
                setSelectedGift(null);
                setGiftReason('');
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <h2 className="text-xl font-semibold">Send Gift</h2>
            <p className="text-sm text-gray-400 mt-1">
              {selectedUser?.name} . {selectedUser?.email}
            </p>

            <hr className="my-5 border-white/10" />

            {/* Gift Details */}
            <div className="flex items-center gap-3 mb-5">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#D207FF] to-[#00D4FF] flex items-center justify-center">
                <IoGift size={20} />
              </div>
              <div>
                <h3 className="font-medium">Gift Details</h3>
                <p className="text-sm text-gray-400">
                  Send a special gift to your valued customer
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="space-y-4">
              {/* Gift Selector Dropdown */}
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Select Gift <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedGift?._id || ''}
                  onChange={(e) => {
                    const gift = giftsData?.gifts?.find(g => g._id === e.target.value);
                    setSelectedGift(gift || null);
                  }}
                  className="w-full rounded-lg border border-white/10 bg-[#020523] px-4 py-2 text-white focus:outline-none focus:border-cyan-500/50"
                >
                  <option value="">Choose a gift...</option>
                  {giftsData?.gifts?.map((gift) => (
                    <option key={gift._id} value={gift._id}>
                      {gift.GiftName} - ${gift.Giftvalue} ({gift.count} available)
                    </option>
                  ))}
                </select>
              </div>

              {/* Gift Name */}
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Gift Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={selectedGift?.GiftName || ''}
                  readOnly
                  placeholder="eg. Premium Perfume Collection"
                  className="w-full rounded-lg border border-white/10 bg-transparent px-4 py-2 text-white placeholder-gray-500 focus:outline-none"
                />
              </div>

              {/* Gift Value */}
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Gift Value ($) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={selectedGift?.Giftvalue || ''}
                  readOnly
                  placeholder="150.00"
                  className="w-full rounded-lg border border-white/10 bg-transparent px-4 py-2 text-white focus:outline-none"
                />
              </div>

              {/* Reason */}
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Reason For Gift <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows="3"
                  value={giftReason}
                  onChange={(e) => setGiftReason(e.target.value)}
                  placeholder="eg. Thank you for being a loyal customer"
                  className="w-full rounded-lg border border-white/10 bg-transparent px-4 py-2 text-white placeholder-gray-500 focus:outline-none"
                />
              </div>

            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setIsGiftOpen(false);
                  setSelectedGift(null);
                  setGiftReason('');
                }}
                className="px-4 py-2 text-gray-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSendGift}
                disabled={!selectedGift || !giftReason || isAssigningGift}
                className={`px-5 py-2 rounded-lg ${selectedGift
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-gray-600 cursor-not-allowed'
                  }`}
              >
                {isAssigningGift ? "Sending..." : "Send Gift"}
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default UserList;
