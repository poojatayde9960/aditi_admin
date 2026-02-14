import { useState } from "react";
import { Search, Eye } from "lucide-react";
import { Icon } from "@iconify/react";
import OrderDetails from "../components/OrderDetails";
import { useGetOdersQuery, useUpdateStatusMutation } from "../../Redux/Apis/OrdersApi";

const Orders = () => {
  const { data, isLoading, refetch } = useGetOdersQuery();
  const [updateStatus, { isLoading: isUpdating }] = useUpdateStatusMutation();

  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const tabs = ["All", "Pending", "Processing", "Shipped", "Completed"];

  const orders = (data?.orders || []).map((order) => {
    const totalItems = order.products?.reduce(
      (sum, p) => sum + (p.qty || p.quantity || 0),
      0
    ) || 0;

    const contact = order.userId?.phone || order.userId?.email || "N/A";

    return {
      id: order._id?.slice(-6) || "N/A",
      orderId: order._id,
      name: order.userId?.name || "N/A",
      contact,
      items: totalItems,
      amount: `₹${order.totalAmount?.toLocaleString("en-IN") || 0}`,
      status: order.Status || "Pending",
      date: order.createdAt
        ? new Date(order.createdAt).toLocaleDateString("en-IN")
        : "N/A",
      paid: order.paymentStatus === "completed" ? "Paid" : "Unpaid",
      raw: order,
    };
  });

  const statusStyles = {
    Completed: "bg-[#22FF0030] text-[#22FF00]",
    Pending: "bg-[#D9FF0030] text-[#D9FF00]",
    Processing: "bg-[#00D4FF0F] text-[#00D4FF]",
    Shipped: "bg-[#D207FF3B] text-[#D207FF]",
  };

  // Filter by tab + search
  const filteredOrders = orders.filter((order) => {
    const matchesTab = activeTab === "All" || order.status === activeTab;
    const matchesSearch =
      order.name.toLowerCase().includes(search.toLowerCase()) ||
      order.id.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Status update
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateStatus({ orderId, status: newStatus }).unwrap();
      await refetch();
      setActiveTab(newStatus);
    } catch (err) {
      console.error("Failed to update order status:", err);
    }
  };

  const getActionButton = (order) => {
    const status = order.status;
    if (activeTab === "All") return null;

    if (status === "Pending") {
      return (
        <button
          onClick={() => handleStatusChange(order.orderId, "Processing")}
          disabled={isUpdating}
          className="bg-[#00D4FF] text-black px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-[#00b8d9] disabled:opacity-50 transition"
        >
          {isUpdating ? "Updating..." : "Processing"}
        </button>
      );
    }
    if (status === "Processing") {
      return (
        <button
          onClick={() => handleStatusChange(order.orderId, "Shipped")}
          disabled={isUpdating}
          className="bg-[#D207FF] text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-[#b006d6] disabled:opacity-50 transition"
        >
          {isUpdating ? "Updating..." : "Shipped"}
        </button>
      );
    }
    if (status === "Shipped") {
      return (
        <button
          onClick={() => handleStatusChange(order.orderId, "Completed")}
          disabled={isUpdating}
          className="bg-[#22FF00] text-black px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-[#1de600] disabled:opacity-50 transition"
        >
          {isUpdating ? "Updating..." : "Delivered"}
        </button>
      );
    }
    if (status === "Completed") {
      return <span className="text-[#22FF00] text-sm font-medium">✓ Delivered</span>;
    }
    return null;
  };

  return (
    <>
      <div className="bg-[#020523] lg:ml-23 mt-5 min-h-screen text-white pb-10">
        {/* Header */}
        <div className="flex justify-between items-start flex-col md:flex-row gap-4">
          <div className="-mt-7">
            <h1 className="text-3xl font-manrope">Orders</h1>
            <p className="text-gray-400 text-xs mt-1">Manage Customer Orders And Fulfillment</p>
          </div>

          <button className="flex items-center gap-2 bg-[#FFFFFF1C] border border-white/10 px-5 py-3 rounded-xl hover:bg-[#141a3a] transition">
            <Icon icon="solar:export-broken" width={20} height={20} className="text-white" />
            Export
          </button>
        </div>

        {/* Tabs + Search */}
        <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-0 rounded-lg bg-[#0b1135] p-2 items-stretch md:items-center mt-6">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide w-full md:w-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 md:px-6 py-2.5 md:py-3 whitespace-nowrap rounded-xl text-sm font-medium transition border border-[#FFFFFF1C] ${activeTab === tab
                  ? "bg-[#00D4FF] text-black"
                  : "bg-[#FFFFFF1C] text-gray-300 hover:text-white"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 bg-[#020523] px-4 py-3 rounded-2xl border border-white/10 w-full md:w-[380px]">
            <Search size={18} className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search Customer Name Or Id"
              className="bg-transparent outline-none text-sm w-full placeholder-gray-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-[#0b1135] border border-white/10 rounded-3xl overflow-x-auto mt-8 shadow-xl">
          <table className="w-full min-w-[700px] text-left">
            <thead>
              <tr className="text-gray-400 text-sm border-b border-white/10">
                <th className="p-5">Order ID</th>
                <th className="p-5">Customer</th>
                <th className="p-5">Items</th>
                <th className="p-5">Amount</th>
                <th className="p-5">Status</th>
                <th className="p-5">Date</th>
                <th className="p-5">Payment</th>
                <th className="p-5">View</th>
                {/* <th className="p-5">Action</th> */}
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan={9} className="text-center py-12 text-gray-500 text-lg">
                    Loading Orders...
                  </td>
                </tr>
              )}

              {!isLoading && filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={9} className="text-center py-12 text-gray-500 text-lg">
                    No Orders Found
                  </td>
                </tr>
              )}

              {filteredOrders.map((order, index) => (
                <tr key={order.orderId || index} className="border-b border-white/5 hover:bg-white/5 transition">
                  <td className="p-4 font-medium">{order.id}</td>
                  <td className="p-4 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#1a214a] flex items-center justify-center text-[#00d2ff] font-semibold">
                      {order.name?.[0]?.toUpperCase() ?? "?"}
                    </div>
                    <div>
                      <p className="text-white">{order.name}</p>
                      <p className="text-gray-400 text-sm">{order.contact}</p>
                    </div>
                  </td>
                  <td className="p-4 text-gray-300">{order.items}</td>
                  <td className="p-4 text-gray-300">{order.amount}</td>
                  <td className="p-4">
                    <span className={`px-4 py-1 rounded-lg text-sm font-medium ${statusStyles[order.status] || "bg-gray-600/30 text-gray-300"}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-300">{order.date}</td>
                  <td className="p-4">
                    <span className="px-4 py-1 rounded-lg bg-[#22FF0030] text-[#22FF00] text-sm font-medium">
                      {order.paid}
                    </span>
                  </td>
                  <td className="p-4">
                    <Eye
                      size={20}
                      className="text-[#00d2ff] cursor-pointer hover:text-[#00b8d9] transition"
                      onClick={() => { setSelectedOrder(order.raw); setDetailsOpen(true); }}
                    />
                  </td>
                  <td className="p-4">{getActionButton(order)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <OrderDetails open={detailsOpen} onClose={() => setDetailsOpen(false)} order={selectedOrder} />
    </>
  );
};

export default Orders;