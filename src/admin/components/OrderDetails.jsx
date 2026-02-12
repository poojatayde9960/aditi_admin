import React from "react";
import { X } from "lucide-react";
import bg1 from "/public/bg1.png";
import { Icon } from "@iconify/react";
import { useGetOdersByIdQuery } from "../../Redux/Apis/OrdersApi";

const OrderDetails = ({ open, onClose, order }) => {
  if (!open || !order?._id) return null;

  const { data, isLoading } = useGetOdersByIdQuery(order._id);
  const orderData = data?.order;

  if (isLoading || !orderData) {
    return (
      <div className="fixed inset-0 z-50 flex justify-end">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <div className="relative w-[450px] md:w-[520px] h-full bg-[#020523] text-white p-6 flex items-center justify-center">
          Loading Order Details...
        </div>
      </div>
    );
  }

  const totalItems = orderData?.products?.reduce(
    (sum, p) => sum + (p?.quantity || p?.qty || 0),
    0
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-[450px] md:w-[520px] h-full bg-[#020523] text-white p-6 overflow-y-auto shadow-2xl border-l border-white/10">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold mt-6">
              #{orderData?._id?.slice(-6) || "N/A"}
            </h2>
            <p className="text-gray-400 text-sm">
              {orderData?.createdAt
                ? new Date(orderData.createdAt).toLocaleDateString("en-IN")
                : "N/A"}
            </p>
          </div>

          <span className="px-4 py-1 mt-3 inline-block mr-4 rounded-xl bg-green-700/20 text-green-400">
            {orderData?.paymentStatus === "completed"
              ? "Completed"
              : "Pending"}
          </span>
        </div>

        <div className="mt-8 space-y-6">
          {/* CUSTOMER INFO */}
          <div className="bg-[#0B1135] p-5 rounded-2xl border border-white/10">
            <h3 className="text-sm text-gray-400 mb-3 font-manrope">
              Customer Information
            </h3>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1a214a] flex items-center justify-center text-[#00d2ff] font-semibold">
                C
              </div>

              <div>
                <p className="font-medium">
                  {orderData?.addressId?.fullName || "Customer"}
                </p>
                <p className="text-gray-400 text-sm">
                  {orderData?.addressId?.phone || "N/A"}
                </p>
              </div>
            </div>

            <p className="text-gray-400 text-xs mt-4">
              Shipping Address
            </p>

            {/* ✅ FIXED */}
            <p className="text-sm mt-1">
              {orderData?.addressId
                ? `${orderData.addressId.street}, ${orderData.addressId.city}, ${orderData.addressId.state} - ${orderData.addressId.pincode}`
                : "N/A"}
            </p>
          </div>

          {/* ORDER ITEMS */}
          <div className="bg-[#0B1135] p-5 rounded-2xl border border-white/10">
            <h3 className="text-sm text-gray-400 mb-3">Order Items</h3>

            {orderData?.products?.map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center py-3 border-b border-white/10"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-[#FFFFFF2E] rounded-xl">
                    <img
                      src={bg1}
                      className="w-12 h-12 rounded-full"
                      alt="product"
                    />
                  </div>

                  <div>
                    {/* ✅ FIXED */}
                    <p className="font-manrope">
                      Product ID:{" "}
                      {item?.productId?._id
                        ? item.productId._id.slice(-6)
                        : typeof item?.productId === "string"
                          ? item.productId.slice(-6)
                          : "N/A"}

                    </p>
                    <p className="text-gray-400 text-xs font-manrope">
                      Quantity: {item?.quantity || item?.qty || 0}
                    </p>
                  </div>
                </div>

                <p>${orderData?.totalAmount || 0}</p>
              </div>
            ))}

            <div className="mt-4">
              <div className="flex justify-between text-gray-300 text-sm">
                <p className="text-[#A19F9F]">Items</p>
                <p>{totalItems || 0}</p>
              </div>

              <div className="flex mt-3 justify-between text-gray-300 text-sm">
                <p>Shipping</p>
                <p>$0</p>
              </div>

              <div className="flex justify-between text-lg mt-3">
                <p>Total</p>
                <p>${orderData?.totalAmount || 0}</p>
              </div>
            </div>
          </div>

          {/* TIMELINE */}
          <div className="bg-[#0B1135] p-5 rounded-2xl border border-white/10">
            <h3 className="text-sm text-gray-400 mb-3">Order Timeline</h3>

            {[
              "Order Placed",
              "Payment Confirmed",
              "Processing",
              "Shipped",
              "Delivered",
            ].map((step, index) => (
              <div
                key={index}
                className="relative pb-8 flex items-center gap-4"
              >
                <div className="w-14 h-14 rounded-full bg-[#FFFFFF2E] flex items-center justify-center">
                  <Icon
                    icon="solar:check-circle-broken"
                    width="28"
                    height="28"
                    className="text-[#00D4FF]"
                  />
                </div>

                {index < 4 && (
                  <div className="absolute left-[29px] top-[60%] w-[1px] h-10 bg-[#FFFFFF4A]" />
                )}

                <div>
                  <p className="font-medium">{step}</p>
                  <p className="text-gray-400 text-xs">
                    {orderData?.createdAt
                      ? new Date(orderData.createdAt).toLocaleString()
                      : "N/A"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
