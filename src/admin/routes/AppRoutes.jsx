import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import AdminLayout from "../AdminLayout";

import AdminDashboard from "../pages/AdminDashboard";
import UserManagement from "../pages/UserManagement";
import Orders from "../pages/Orders";
import Analytics from "../pages/Analytics";
import Products from "../pages/Products";
import Transactions from "../pages/Transactions";
import Enquiries from "../pages/Enquiries";
import OverallVisitorTrends from "../components/OverallVisitorTrends";
import CustomerDetail from "../pages/CustomerDetail";
import Blog from "../pages/Blog";
import Gifts from "../pages/Gifts";
import Login from "../pages/Login";
import AdminProtector from "./Protectore";

const AppRoutes = () => {
  return (
    <Routes>

      <Route path="/login" element={<Login />} />
      {/* Admin Pages */}
      <Route path="/" element={<AdminProtector compo={<AdminLayout />} />}>
        <Route index element={<AdminDashboard />} />
        <Route path="admin/user-management" element={<UserManagement />} />
        <Route path="admin/analytics" element={<Analytics />} />
        <Route path="admin/orders" element={<Orders />} />
        <Route path="admin/products" element={<Products />} />
        <Route path="admin/transactions" element={<Transactions />} />
        <Route path="admin/enquiries" element={<Enquiries />} />
        <Route path="admin/customer-detail" element={<Navigate to="/admin/user-management" replace />} />
        <Route path="admin/customer-detail/:userId" element={<CustomerDetail />} />
        <Route path="admin/overallVisitorTrends" element={<OverallVisitorTrends />} />
        <Route path="admin/blog" element={<Blog />} />
        <Route path="admin/gifts" element={<Gifts />} />
      </Route>

      {/* Fallback */}
      {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
    </Routes>
  );
};

export default AppRoutes;
