import React from "react";
import { useGetTopSellingQuery } from "../../Redux/Apis/dashboardApi";
import { useGetOdersQuery } from "../../Redux/Apis/OrdersApi";

const TopSellingAndOrders = () => {
  const { data, isLoading } = useGetTopSellingQuery();
  const { data: ordersData, isLoading: ordersLoading } =
    useGetOdersQuery();

  /* =========================
        TOP SELLING LOGIC
  ========================= */

  // ✅ Merge duplicate perfumes by name
  const mergedData = (data?.data || []).reduce((acc, item) => {
    const existing = acc.find((p) => p.name === item.name);

    if (existing) {
      existing.totalSold += item.totalSold || 0;
    } else {
      acc.push({
        ...item,
        totalSold: item.totalSold || 0,
      });
    }

    return acc;
  }, []);

  // ✅ Total sales for percentage calculation
  const totalSales = mergedData.reduce(
    (sum, item) => sum + item.totalSold,
    0
  );

  // ✅ Sort + Top 5 + Format
  const topSelling = mergedData
    .sort((a, b) => b.totalSold - a.totalSold)
    .slice(0, 5)
    .map((item, index) => {
      const percent =
        totalSales > 0
          ? ((item.totalSold / totalSales) * 100).toFixed(1)
          : 0;

      return {
        id: index + 1,
        name: item.name,
        image: item.image,
        sales: `${item.totalSold} Sales`,
        price: `€${item.price}`,
        percent: `${percent}%`,
        percentColor:
          percent > 30
            ? "text-green-400"
            : percent > 15
              ? "text-yellow-400"
              : "text-gray-400",
      };
    });

  /* =========================
        RECENT ORDERS
  ========================= */

  const recentOrders = ordersData?.orders?.length
    ? [...ordersData.orders]
      .sort(
        (a, b) =>
          new Date(b.createdAt) - new Date(a.createdAt)
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
          order.products?.[0]?.productId?.name ||
          `${order.products?.length} Products`,
        time: new Date(order.createdAt).toLocaleDateString(),
      }))
    : [];

  /* =========================
        LOADING STATE
  ========================= */

  if (isLoading || ordersLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6 animate-pulse">
        {/* Left Skeleton */}
        <div className="bg-[#FFFFFF0A] border border-white/10 rounded-2xl p-6 shadow-lg h-[450px]">
          <div className="h-6 bg-white/5 rounded w-1/3 mb-1"></div>
          <div className="h-4 bg-white/5 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="bg-[#020523]/40 rounded-xl flex justify-between items-center p-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/5"></div>
                  <div className="w-10 h-10 rounded-md bg-white/5"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-white/5 rounded w-24"></div>
                    <div className="h-2 bg-white/5 rounded w-16"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-white/5 rounded w-12 ml-auto"></div>
                  <div className="h-2 bg-white/5 rounded w-8 ml-auto"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Skeleton */}
        <div className="bg-[#FFFFFF0A] border border-white/10 rounded-2xl p-6 shadow-lg h-[450px]">
          <div className="h-6 bg-white/5 rounded w-1/3 mb-1"></div>
          <div className="h-4 bg-white/5 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="bg-[#020523]/40 rounded-xl flex justify-between items-center p-4">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-white/5"></div>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <div className="h-3 bg-white/5 rounded w-20"></div>
                      <div className="h-3 bg-white/5 rounded w-12"></div>
                    </div>
                    <div className="h-2 bg-white/5 rounded w-32"></div>
                  </div>
                </div>
                <div className="h-2 bg-white/5 rounded w-16"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* =========================
        MAIN RETURN
  ========================= */

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">

      {/* LEFT: TOP SELLING PERFUMES */}
      <div className="bg-[#FFFFFF0A] border border-white/10 rounded-2xl p-6 shadow-lg">
        <h2 className="section-header-title mb-1">
          Top Selling Perfumes
        </h2>
        <p className="text-gray-400 text-xs mb-6">
          Best performers this month
        </p>

        <div className="space-y-4">
          {topSelling.length > 0 ? (
            topSelling.map((item) => (
              <div
                key={item.id}
                className="bg-[#020523]/40 rounded-xl flex justify-between items-center p-4 hover:bg-[#1e2746]/60 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  {/* Rank */}
                  <div className="w-10 h-10 rounded-lg bg-[#141b3d] flex items-center justify-center text-[#00d5ff] ">
                    {item.id}
                  </div>

                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 rounded-md object-cover"
                  />

                  {/* Info */}
                  <div>
                    <p className="text-white text-sm">
                      {item.name}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {item.sales}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-white  font-manrope  text-sm">
                    {item.price}
                  </p>
                  <p
                    className={`text-xs font-medium ${item.percentColor}`}
                  >
                    {item.percent}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center">
              No sales data available
            </p>
          )}
        </div>
      </div>

      {/* RIGHT: RECENT ORDERS */}
      <div className="bg-[#FFFFFF0A] border border-white/10 rounded-2xl p-6 shadow-lg">
        <h2 className="section-header-title mb-1">
          Recent Orders
        </h2>
        <p className="text-gray-400 text-xs mb-6">
          Latest Order Activity
        </p>

        <div className="space-y-4">
          {recentOrders.length > 0 ? (
            recentOrders.map((order, index) => (
              <div
                key={index}
                className="bg-[#020523]/40 rounded-xl flex justify-between items-center p-4 hover:bg-[#1e2746]/60 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-[#00d5ff] rounded-full mt-2 shadow-[0_0_8px_#00d5ff]"></div>

                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <p className="text-white text-sm font-medium">
                        {order.orderId}
                      </p>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${order.statusColor}`}
                      >
                        {order.status}
                      </span>
                    </div>

                    <p className="text-gray-400 text-xs">
                      {order.name} • {order.product}
                    </p>
                  </div>
                </div>

                <p className="text-gray-400 text-xs whitespace-nowrap">
                  {order.time}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center">
              No recent orders
            </p>
          )}
        </div>
      </div>

    </div>
  );
};

export default TopSellingAndOrders;