
import React from "react";
import { useGetTopSellingQuery } from "../../Redux/Apis/dashboardApi";
import { useGetOdersQuery } from "../../Redux/Apis/OrdersApi";

const TopSellingAndOrders = () => {
  const { data, isLoading } = useGetTopSellingQuery();
  const { data: ordersData, isLoading: ordersLoading } = useGetOdersQuery();

 
  const topSelling = data?.data
    ? [...data.data]
      .sort((a, b) => b.totalSold - a.totalSold)
      .slice(0, 5)
      .map((item, index) => ({
        id: index + 1,
        name: item.name,
        sales: `${item.totalSold} Sales`,
        price: `$${item.price}`,
       percent: item.discount ? `${item.discount}%` : "0%",
        percentColor:
          item.stock > 0 ? "text-[#22FF0030]" : "text-red-500",
      }))
    : [];

  // order
  const recentOrders = ordersData?.orders
    ? [...ordersData.orders]
      .sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
      .slice(0, 5)
      .map((order) => ({
        orderId: `#${order._id.slice(-6)}`,
        status:
          order.paymentStatus === "completed"
            ? "Completed"
            : order.paymentStatus === "pending"
              ? "Pending"
              : "Processing",
        statusColor:
          order.paymentStatus === "completed"
            ? "bg-[#22FF0030] text-[#22FF00]"
            : order.paymentStatus === "pending"
              ? "bg-[#D9FF0030] text-[#D9FF00]"
              : "bg-[#00D4FF0F] text-[#00D4FF]",
        name: order.userId?.name || "Customer",
        product:
          order.products?.[0]?.productId?.name || "Multiple Products",
        time: new Date(order.createdAt).toLocaleDateString(),
      }))
    : [];

  if (isLoading || ordersLoading) {
    return <p className="text-white">Loading...</p>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">

      {/* LEFT: TOP SELLING PERFUMES */}
      <div className="bg-[#FFFFFF0A] border border-white/10 rounded-2xl p-4 sm:p-6 shadow-lg">
        <h2 className="text-lg sm:text-xl text-white mb-1">
          Top Selling Perfumes
        </h2>
        <p className="text-gray-400 text-[10px] sm:text-xs mb-4 sm:mb-6">
          Best performers this month
        </p>

        <div className="space-y-3 sm:space-y-4">
          {topSelling.map((item) => (
            <div
              key={item.id}
              className="w-full bg-[#020523]/40 rounded-xl flex justify-between items-center p-3 sm:p-4 hover:bg-[#1e2746]/60 transition-all duration-300"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#141b3d] flex items-center justify-center text-[#00d5ff] text-sm sm:text-base font-bold">
                  {item.id}
                </div>
                <div>
                  <p className="text-white text-xs sm:text-sm">
                    {item.name}
                  </p>
                  <p className="text-gray-400 text-[10px] sm:text-xs">
                    {item.sales}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-white font-semibold text-xs sm:text-sm">
                  {item.price}
                </p>
                <p
                  className={`text-[10px] sm:text-xs font-medium ${item.percentColor}`}
                >
                  {item.percent}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT: RECENT ORDERS */}
      <div className="bg-[#FFFFFF0A] border border-white/10 rounded-2xl p-4 sm:p-6 shadow-lg">
        <h2 className="text-lg sm:text-xl text-white mb-1">
          Recent Orders
        </h2>
        <p className="text-gray-400 text-[10px] sm:text-xs mb-4 sm:mb-6">
          Latest Order Activity
        </p>

        <div className="space-y-3 sm:space-y-4">
          {recentOrders.map((order, index) => (
            <div
              key={index}
              className="w-full bg-[#020523]/40 rounded-xl flex justify-between items-center p-3 sm:p-4 hover:bg-[#1e2746]/60 transition-all duration-300"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-2 h-2 bg-[#00d5ff] rounded-full mt-2 shadow-[0_0_8px_#00d5ff]"></div>

                <div>
                  <div className="flex items-center gap-2 sm:gap-3 mb-1">
                    <p className="text-white text-xs sm:text-sm font-medium">
                      {order.orderId}
                    </p>
                    <span
                      className={`text-[8px] sm:text-[10px] font-bold px-2 py-0.5 rounded-md ${order.statusColor}`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <p className="text-gray-400 text-[10px] sm:text-xs">
                    {order.name} <span className="mx-1">•</span>{" "}
                    {order.product}
                  </p>
                </div>
              </div>

              <p className="text-gray-400 text-[10px] sm:text-xs whitespace-nowrap">
                {order.time}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default TopSellingAndOrders;
