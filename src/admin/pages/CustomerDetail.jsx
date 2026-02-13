import React, { useState } from 'react';
import { MapPin, Calendar, ChevronDown, CheckCircle, X } from 'lucide-react';
import { IoGift } from 'react-icons/io5';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import img from '../../../public/bg1.png';
import { useGetOrderDetailByIdQuery } from '../../Redux/Apis/OrdersApi';
import { useGetUsersQuery } from '../../Redux/Apis/usersApi';
import { useParams } from 'react-router-dom';
import { useAdminGiftAssignMutation, useGetGiftsQuery, useGiftGetByIdQuery } from '../../Redux/Apis/giftsApi';

export default function CustomerDetails() {

  const { userId } = useParams();
  const [activeTab, setActiveTab] = useState('Ongoing Orders');
  const [isGiftOpen, setIsGiftOpen] = useState(false);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [selectedGift, setSelectedGift] = useState(null);
  const [giftReason, setGiftReason] = useState('');
  const [adminGiftAssign, { isLoading: isAssigningGift }] = useAdminGiftAssignMutation();
  const { data: giftsData, isLoading: isLoadingGiftsData, isError: isErrorGiftsData } = useGetGiftsQuery();
  const { data: orderData, isLoading: isLoadingOrders, isError: isErrorOrders } = useGetOrderDetailByIdQuery(userId, {
    skip: !userId,
  });

  // Fetch all users to get user details
  const { data: usersData, isLoading: isLoadingUsers, isError: isErrorUsers } = useGetUsersQuery();

  const tabs = ['Ongoing Orders', 'Completed Orders', 'Addresses', 'Gifts'];
  const { data: giftData, isLoading: isLoadingGifts, isError: isErrorGifts } = useGiftGetByIdQuery(userId);
  // Loading state
  if (isLoadingOrders || isLoadingUsers || isLoadingGifts) {
    return (
      <div className="min-h-screen lg:ml-20 bg-[#020523] text-white p-5 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-xl text-cyan-400">Loading customer data...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (isErrorOrders || isErrorUsers) {
    return (
      <div className="min-h-screen lg:ml-20 bg-[#020523] text-white p-5 flex items-center justify-center">
        <div className="bg-red-900/30 border border-red-500 rounded-xl p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Error Loading Data</h2>
          <p className="text-red-300">There was an error fetching the customer details.</p>
        </div>
      </div>
    );
  }
  const handleSendGift = async () => {
    if (!selectedGift || !giftReason) return;

    try {
      await adminGiftAssign({
        giftId: selectedGift._id,
        userId: userId,
        Reasonforgift: giftReason
      }).unwrap();

      alert("Gift Assigned Successfully ✅");

      setIsGiftOpen(false);
      setSelectedGift(null);
      setGiftReason("");

    } catch (error) {
      console.error(error);
      alert("Failed to assign gift ❌");
    }
  };
  // Extract orders from API response
  const orders = orderData?.orders || [];

  // Find the user from the users list
  const user = usersData?.users?.find(u => u._id === userId);

  // No data state
  if (!user) {
    return (
      <div className="min-h-screen lg:ml-20 bg-[#020523] text-white p-5 flex items-center justify-center">
        <div className="bg-yellow-900/30 border border-yellow-500 rounded-xl p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">No Data Available</h2>
          <p className="text-yellow-300">No customer data found for this user.</p>
        </div>
      </div>
    );
  }

  // Get user initials
  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get user's primary address
  const primaryAddress = user.addresses?.find(addr => addr.isDefault) || user.addresses?.[0];

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  // Get order status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'processing':
        return 'bg-[#00D4FF38] text-[#00D4FF]';
      case 'shipped':
        return 'bg-blue-500/20 text-blue-400';
      case 'delivered':
      case 'completed':
        return 'bg-green-500/20 text-green-400';
      case 'cancelled':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <>
      <div className="min-h-screen lg:ml-20 bg-[#020523] text-white p-5">
        <div className="max-w-10xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Customer Details</h1>
            <p className="text-slate-400 text-sm">Manage Your Customer Base</p>
          </div>

          {/* Debug Section */}
          {/* <div className="mb-6 p-6 bg-slate-800/50 border border-cyan-500 rounded-xl">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">API Response Data (Debug)</h2>

            <div className="mb-4 p-4 bg-slate-700/50 rounded-lg">
              <p className="text-white mb-2">
                <span className="font-semibold text-yellow-400">User ID from URL:</span>
                <span className="ml-2 text-green-400">{userId || 'undefined'}</span>
              </p>
              <p className="text-white mb-2">
                <span className="font-semibold text-yellow-400">Loading Orders:</span>
                <span className="ml-2 text-green-400">{isLoadingOrders ? 'Yes' : 'No'}</span>
              </p>
              <p className="text-white mb-2">
                <span className="font-semibold text-yellow-400">Loading Users:</span>
                <span className="ml-2 text-green-400">{isLoadingUsers ? 'Yes' : 'No'}</span>
              </p>
              <p className="text-white mb-2">
                <span className="font-semibold text-yellow-400">Error Orders:</span>
                <span className="ml-2 text-green-400">{isErrorOrders ? 'Yes' : 'No'}</span>
              </p>
              <p className="text-white mb-2">
                <span className="font-semibold text-yellow-400">Error Users:</span>
                <span className="ml-2 text-green-400">{isErrorUsers ? 'Yes' : 'No'}</span>
              </p>
              <p className="text-white mb-2">
                <span className="font-semibold text-yellow-400">User Found:</span>
                <span className="ml-2 text-green-400">{user ? 'Yes' : 'No'}</span>
              </p>
              <p className="text-white">
                <span className="font-semibold text-yellow-400">Orders Count:</span>
                <span className="ml-2 text-green-400">{orders.length}</span>
              </p>
            </div>

            <div className="bg-slate-900 rounded-lg p-4 overflow-auto max-h-[600px]">
              <pre className="text-green-400 text-sm whitespace-pre-wrap">
                {JSON.stringify({ user, orders, rawOrderData: orderData }, null, 2)}
              </pre>
            </div>
          </div> */}

          {/* Customer Info Card */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-slate-700/50">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D207FF] to-[#00D4FF] flex items-center justify-center text-xl font-bold">
                  {getInitials(user.name)}
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{user.name || 'Unknown User'}</h2>
                  <p className="text-slate-400 text-sm">{user.email || 'No email'}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-2 text-slate-300">
                  <MapPin className="w-4 h-4" />
                  <span>{primaryAddress?.country || 'Unknown Location'}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Calendar className="w-4 h-4" />
                  <span>Joined On {formatDate(user.createdAt)}</span>
                </div>
                <button
                  onClick={() => setIsGiftOpen(true)}
                  className="flex items-center gap-2 bg-gradient-to-r from-[#D207FF] to-[#00D4FF] hover:from-[#B806E0] hover:to-[#00B8E0] px-6 py-2 rounded-lg font-medium transition-all"
                >
                  <IoGift className="text-lg" />
                  <span>Send Gift</span>
                </button>
              </div>
            </div>

            {/* Total Spent */}
            <div className="mt-6 pt-6 border-t border-slate-700/50">
              <div className="text-3xl font-bold text-[#22FF00]">
                $ {user.totalSpent?.toLocaleString() || '0'}
              </div>
              <div className="text-slate-400 text-sm">Total Spent</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-2 md:gap-4 mb-6 overflow-x-auto md:overflow-visible pb-2 p-2 bg-[#00D4FF0F] rounded-full w-full md:w-fit">
            {tabs.map((tab, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 md:px-8 md:py-3 text-sm md:text-base rounded-full font-semibold whitespace-nowrap transition-all duration-300 ${activeTab === tab
                  ? 'bg-[#00d1ff] text-[#020b1d] shadow-[0_0_15px_rgba(0,209,255,0.4)]'
                  : 'bg-transparent text-white hover:text-slate-200'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Orders List */}
          {activeTab === 'Ongoing Orders' && (
            <div className="space-y-4">
              {orders.filter(order => {
                const status = order.Status?.toLowerCase();
                return status === 'processing' || status === 'shipped' || status === 'confirmed' || status === 'placed';
              }).length === 0 ? (
                <div className="bg-[#0B1135] backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 text-center">
                  <p className="text-slate-400">No ongoing orders</p>
                </div>
              ) : (
                orders
                  .filter(order => {
                    const status = order.Status?.toLowerCase();
                    return status === 'processing' || status === 'shipped' || status === 'confirmed' || status === 'placed';
                  })
                  .map((order) => (
                    <div
                      key={order._id}
                      className="bg-[#0B1135] backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden"
                    >
                      {/* Order Header - Clickable */}
                      <div
                        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 cursor-pointer hover:bg-slate-800/30 transition-colors"
                        onClick={() => toggleOrderExpansion(order._id)}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                            <HiOutlineShoppingBag className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-semibold">Order #{order._id?.substring(0, 8).toUpperCase()}</h3>
                            <p className="text-slate-400 text-sm">{formatDate(order.createdAt)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-4 py-1.5 rounded-lg text-sm font-medium ${getStatusColor(order.Status)}`}>
                            {order.Status || 'Unknown'}
                          </span>
                          <span className="text-2xl font-bold text-[#22FF00]">
                            ${order.totalAmount?.toLocaleString() || '0'}
                          </span>
                          <ChevronDown
                            className={`w-5 h-5 text-slate-400 transition-transform ${expandedOrderId === order._id ? 'rotate-180' : ''
                              }`}
                          />
                        </div>
                      </div>

                      {/* Expanded Order Details */}
                      {expandedOrderId === order._id && (
                        <div className="px-6 pb-6 space-y-6">
                          {/* Order Items */}
                          <div className="bg-[#020523] rounded-xl p-6">
                            <h4 className="text-slate-400 text-sm mb-4 font-medium">Order Items</h4>
                            <div className="space-y-4">
                              {order.products?.map((product, idx) => (
                                <div key={idx}>
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                      <div className="w-12 h-12 bg-[#FFFFFF12] rounded-lg flex items-center justify-center overflow-hidden">
                                        {product.productId?.images?.[0] ? (
                                          <img
                                            src={product.productId.images[0]}
                                            className="h-12 w-12 object-cover"
                                            alt={product.productId.name}
                                          />
                                        ) : (
                                          <img src={img} className="h-12 w-8 object-cover" alt="" />
                                        )}
                                      </div>
                                      <div>
                                        <h5 className="font-medium">
                                          {product.productId?.name || 'Product'}
                                        </h5>
                                        <p className="text-slate-400 text-sm">
                                          Quantity: {product.quantity || 1}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="text-[#22FF00] font-semibold">
                                      ${((product.price || 0) * (product.quantity || 1)).toLocaleString()}
                                    </div>
                                  </div>
                                  {idx < (order.products?.length || 0) - 1 && (
                                    <hr className="mt-4 border-slate-700" />
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Order Timeline */}
                          <div className="bg-[#020523] rounded-xl p-6">
                            <h4 className="text-slate-400 text-sm mb-4 font-medium">Order Tracking</h4>
                            <div className="space-y-4">
                              {[
                                { status: 'Order Placed', key: 'placed' },
                                { status: 'Payment Confirmed', key: 'confirmed' },
                                { status: 'Processing', key: 'processing' },
                                { status: 'Shipped', key: 'shipped' },
                                { status: 'Delivered', key: 'delivered' },
                              ].map((item, idx) => {
                                const currentStatus = order.Status?.toLowerCase();
                                const completed =
                                  (currentStatus === 'processing' && idx <= 2) ||
                                  (currentStatus === 'shipped' && idx <= 3) ||
                                  (currentStatus === 'delivered' && idx <= 4) ||
                                  (currentStatus === 'confirmed' && idx <= 1) ||
                                  (currentStatus === 'placed' && idx <= 0);

                                return (
                                  <div key={idx} className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                      <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center ${completed
                                          ? 'border-2 border-cyan-500'
                                          : 'border-2 border-slate-600'
                                          }`}
                                      >
                                        <CheckCircle
                                          className={`w-5 h-5 ${completed ? 'text-cyan-400' : 'text-slate-600'
                                            }`}
                                        />
                                      </div>
                                      {idx < 4 && (
                                        <div className="w-0.5 h-12 bg-slate-700 mt-2"></div>
                                      )}
                                    </div>
                                    <div className={idx < 4 ? 'pb-6' : ''}>
                                      <h5
                                        className={`font-medium ${completed ? 'text-white' : 'text-slate-400'
                                          }`}
                                      >
                                        {item.status}
                                      </h5>
                                      <p
                                        className={`text-sm ${completed ? 'text-slate-400' : 'text-slate-500'
                                          }`}
                                      >
                                        {completed ? formatDate(order.createdAt) : 'Pending'}
                                      </p>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Shipping Address */}
                          <div className="bg-[#020523] rounded-xl p-6">
                            <h4 className="text-slate-400 text-sm mb-3 font-medium">Shipping Address</h4>
                            <p className="text-slate-200">
                              {order.addressId && typeof order.addressId === 'object'
                                ? `${order.addressId.street || ''}, ${order.addressId.city || ''}, ${order.addressId.state || ''} ${order.addressId.pincode || ''}, ${order.addressId.country || ''}`
                                : primaryAddress
                                  ? `${primaryAddress.street || ''}, ${primaryAddress.city || ''}, ${primaryAddress.state || ''} ${primaryAddress.pincode || ''}, ${primaryAddress.country || ''}`
                                  : `Address ID: ${order.addressId || 'Not available'}`}
                            </p>
                          </div>

                          {/* Order Summary */}
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between text-slate-300">
                              <span>Subtotal</span>
                              <span>${(order.totalAmount || 0).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-slate-300">
                              <span>Shipping</span>
                              <span>$0</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold pt-2 border-t border-slate-700">
                              <span>Total</span>
                              <span className="text-[#22FF00]">${(order.totalAmount || 0).toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
              )}
            </div>
          )}

          {/* Completed Orders Tab */}
          {activeTab === 'Completed Orders' && (
            <div className="space-y-4">
              {orders.filter(order => {
                const status = order.Status?.toLowerCase();
                return status === 'delivered' || status === 'cancelled' || status === 'completed';
              }).length === 0 ? (
                <div className="bg-[#0B1135] backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 text-center">
                  <p className="text-slate-400">No completed orders</p>
                </div>
              ) : (
                orders
                  .filter(order => {
                    const status = order.Status?.toLowerCase();
                    return status === 'delivered' || status === 'cancelled' || status === 'completed';
                  })
                  .map((order) => (
                    <div
                      key={order._id}
                      className="bg-[#0B1135] backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden"
                    >
                      {/* Order Header - Clickable */}
                      <div
                        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 cursor-pointer hover:bg-slate-800/30 transition-colors"
                        onClick={() => toggleOrderExpansion(order._id)}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                            <HiOutlineShoppingBag className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-semibold">Order #{order._id?.substring(0, 8).toUpperCase()}</h3>
                            <p className="text-slate-400 text-sm">{formatDate(order.createdAt)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-4 py-1.5 rounded-lg text-sm font-medium ${getStatusColor(order.Status)}`}>
                            {order.Status || 'Unknown'}
                          </span>
                          <span className="text-2xl font-bold text-[#22FF00]">
                            ${order.totalAmount?.toLocaleString() || '0'}
                          </span>
                          <ChevronDown
                            className={`w-5 h-5 text-slate-400 transition-transform ${expandedOrderId === order._id ? 'rotate-180' : ''
                              }`}
                          />
                        </div>
                      </div>

                      {/* Expanded Order Details */}
                      {expandedOrderId === order._id && (
                        <div className="px-6 pb-6 space-y-6">
                          {/* Order Items */}
                          <div className="bg-[#020523] rounded-xl p-6">
                            <h4 className="text-slate-400 text-sm mb-4 font-medium">Order Items</h4>
                            <div className="space-y-4">
                              {order.products?.map((product, idx) => (
                                <div key={idx}>
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                      <div className="w-12 h-12 bg-[#FFFFFF12] rounded-lg flex items-center justify-center overflow-hidden">
                                        {product.productId?.images?.[0] ? (
                                          <img
                                            src={product.productId.images[0]}
                                            className="h-12 w-12 object-cover"
                                            alt={product.productId.name}
                                          />
                                        ) : (
                                          <img src={img} className="h-12 w-8 object-cover" alt="" />
                                        )}
                                      </div>
                                      <div>
                                        <h5 className="font-medium">
                                          {product.productId?.name || 'Product'}
                                        </h5>
                                        <p className="text-slate-400 text-sm">
                                          Quantity: {product.quantity || 1}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="text-[#22FF00] font-semibold">
                                      ${((product.price || 0) * (product.quantity || 1)).toLocaleString()}
                                    </div>
                                  </div>
                                  {idx < (order.products?.length || 0) - 1 && (
                                    <hr className="mt-4 border-slate-700" />
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Order Timeline */}
                          <div className="bg-[#020523] rounded-xl p-6">
                            <h4 className="text-slate-400 text-sm mb-4 font-medium">Order Tracking</h4>
                            <div className="space-y-4">
                              {[
                                { status: 'Order Placed', key: 'placed' },
                                { status: 'Payment Confirmed', key: 'confirmed' },
                                { status: 'Processing', key: 'processing' },
                                { status: 'Shipped', key: 'shipped' },
                                { status: 'Delivered', key: 'delivered' },
                              ].map((item, idx) => {
                                const currentStatus = order.Status?.toLowerCase();
                                const completed =
                                  (currentStatus === 'processing' && idx <= 2) ||
                                  (currentStatus === 'shipped' && idx <= 3) ||
                                  (currentStatus === 'delivered' && idx <= 4) ||
                                  (currentStatus === 'confirmed' && idx <= 1) ||
                                  (currentStatus === 'placed' && idx <= 0);

                                return (
                                  <div key={idx} className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                      <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center ${completed
                                          ? 'border-2 border-cyan-500'
                                          : 'border-2 border-slate-600'
                                          }`}
                                      >
                                        <CheckCircle
                                          className={`w-5 h-5 ${completed ? 'text-cyan-400' : 'text-slate-600'
                                            }`}
                                        />
                                      </div>
                                      {idx < 4 && (
                                        <div className="w-0.5 h-12 bg-slate-700 mt-2"></div>
                                      )}
                                    </div>
                                    <div className={idx < 4 ? 'pb-6' : ''}>
                                      <h5
                                        className={`font-medium ${completed ? 'text-white' : 'text-slate-400'
                                          }`}
                                      >
                                        {item.status}
                                      </h5>
                                      <p
                                        className={`text-sm ${completed ? 'text-slate-400' : 'text-slate-500'
                                          }`}
                                      >
                                        {completed ? formatDate(order.createdAt) : 'Pending'}
                                      </p>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Shipping Address */}
                          <div className="bg-[#020523] rounded-xl p-6">
                            <h4 className="text-slate-400 text-sm mb-3 font-medium">Shipping Address</h4>
                            <p className="text-slate-200">
                              {order.addressId && typeof order.addressId === 'object'
                                ? `${order.addressId.street || ''}, ${order.addressId.city || ''}, ${order.addressId.state || ''} ${order.addressId.pincode || ''}, ${order.addressId.country || ''}`
                                : primaryAddress
                                  ? `${primaryAddress.street || ''}, ${primaryAddress.city || ''}, ${primaryAddress.state || ''} ${primaryAddress.pincode || ''}, ${primaryAddress.country || ''}`
                                  : `Address ID: ${order.addressId || 'Not available'}`}
                            </p>
                          </div>

                          {/* Order Summary */}
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between text-slate-300">
                              <span>Subtotal</span>
                              <span>${(order.totalAmount || 0).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-slate-300">
                              <span>Shipping</span>
                              <span>$0</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold pt-2 border-t border-slate-700">
                              <span>Total</span>
                              <span className="text-[#22FF00]">${(order.totalAmount || 0).toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
              )}
            </div>
          )}

          {/* Addresses Tab */}
          {activeTab === 'Addresses' && (
            <div className="space-y-4">
              {!user.addresses || user.addresses.length === 0 ? (
                <div className="bg-[#0B1135] backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 text-center">
                  <p className="text-slate-400">No addresses available</p>
                </div>
              ) : (
                user.addresses.map((address, index) => (
                  <div
                    key={address._id || index}
                    className="bg-[#0B1135] backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6"
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      {/* Address Details */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-lg font-semibold text-white">
                            {address.fullName || user.name}
                          </h3>
                          {address.isDefault && (
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                              Default
                            </span>
                          )}
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400 border border-purple-500/30">
                            {address.addressType || 'Other'}
                          </span>
                        </div>

                        <div className="space-y-2 text-slate-300">
                          {address.phone && (
                            <p className="flex items-center gap-2">
                              <span className="text-slate-400 text-sm">Phone:</span>
                              <span className="text-white">{address.phone}</span>
                            </p>
                          )}

                          <p className="text-slate-200">
                            {address.street && `${address.street}, `}
                            {address.nearArea && `${address.nearArea}, `}
                            {address.city && `${address.city}, `}
                            {address.state && `${address.state} `}
                            {address.pincode && `${address.pincode}`}
                          </p>

                          {address.country && (
                            <p className="flex items-center gap-2">
                              <span className="text-slate-400 text-sm">Country:</span>
                              <span className="text-white">{address.country}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Gifts Tab */}
          {activeTab === 'Gifts' && (
            <div className="space-y-4">
              {giftData?.gifts?.length === 0 ? (
                <div className="bg-[#0B1135] backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 text-center">
                  <p className="text-slate-400">No gifts sent yet</p>
                </div>
              ) : (
                giftData?.gifts?.map((gift) => (
                  <div
                    key={gift._id}
                    className="bg-[#0B1135] backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-lg font-semibold text-white">
                        {gift.GiftName}
                      </h3>
                      <span className="text-[#22FF00] font-bold text-lg">
                        ${gift.Giftvalue}
                      </span>
                    </div>

                    <p className="text-slate-400 mb-3">
                      {gift.Reasonforgift}
                    </p>

                    <div className="text-sm text-slate-500">
                      Sent on {new Date(gift.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
          {/* Send Gift Modal */}
          {isGiftOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
              <div className="w-full max-w-xl rounded-2xl bg-gradient-to-br from-[#050b2e] to-[#020617] p-6 shadow-2xl relative">
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

                <h2 className="text-xl font-semibold">Send Gift</h2>
                <p className="text-sm text-gray-400 mt-1">
                  {user.name} · {user.email}
                </p>

                <hr className="my-5 border-white/10" />

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
      </div>
    </>
  );
}