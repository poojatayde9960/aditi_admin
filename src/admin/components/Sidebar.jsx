import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import angle from "/public/angle.png";

const menuItems = [
  { name: "Dashboard", path: "/", icon: "mingcute:grid-fill" },
  { name: "Users", path: "/admin/user-management", icon: "heroicons-solid:user-group" },
  { name: "Analytics", path: "/admin/analytics", icon: "simple-line-icons:chart" },
  { name: "Orders", path: "/admin/orders", icon: "solar:bag-bold" },
  { name: "Products", path: "/admin/products", icon: "mingcute:add-circle-fill" },
  { name: "Transactions", path: "/admin/transactions", icon: "solar:bag-check-bold" },
  { name: "Messages", path: "/admin/enquiries", icon: "majesticons:messages" },
  { name: "Blogs", path: "/admin/blog", icon: "f7:doc-text-fill" },
  { name: "Gifts", path: "/admin/gifts", icon: "mdi:gift" },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const [hovered, setHovered] = useState(null);

  return (
    <>
      {/* ================= MOBILE SIDEBAR ================= */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-[#020523]
          md:hidden transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* LOGO */}
        <div className="flex items-center justify-center gap-3 px-5 py-6 border-b border-white/10 text-white">
          <img src="/aditi.png" className="h-30 w-20 object-cover" alt="Logo" />
          {/* <span className="text-lg font-semibold">Maison Aditi</span> */}
        </div>

        {/* MENU */}
        <nav className="px-4 py-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={toggleSidebar}
                className={`
                  flex items-center gap-4 px-4 py-3 rounded-lg
                  transition-all
                  ${isActive
                    ? "bg-[#00d5ff]/20 text-[#00d5ff]"
                    : "text-gray-300 hover:bg-white/5"}
                `}
              >
                <Icon icon={item.icon} width={22} />
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* MOBILE OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* ================= DESKTOP SIDEBAR (UNCHANGED) ================= */}
      <aside
        className="
          hidden md:flex fixed top-0 left-0 z-50 h-full w-[91px]
          bg-[#020523] flex-col items-center py-6
          border-r border-white/5 shadow-2xl
        "
      >
        {/* DECORATION */}
        <div className="absolute left-0 top-0 h-full w-20 pointer-events-none">
          <img
            src={angle}
            alt="sidebar decoration"
            className="absolute top-[119px] h-[620px] opacity-80"
            style={{ filter: "drop-shadow(0 0 30px rgba(0,213,255,0.5))" }}
          />
        </div>

        {/* LOGO */}
        <div className="mb-15 flex flex-col items-center text-white">
          <img src="/aditi.png" className="w-32 h-20 object-contain brightness-200" />
          {/* <div className="mt-8 w-10 h-[1px] bg-white/10" /> */}
        </div>

        {/* ICON MENU */}
        <nav className="flex-1 flex flex-col gap-3 items-center relative">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const isHovered = hovered === item.path;

            return (
              <div key={item.path} className="relative w-full flex justify-center">
                <Link
                  to={item.path}
                  onMouseEnter={() => setHovered(item.path)}
                  onMouseLeave={() => setHovered(null)}
                  className={`
            relative w-12 h-12 flex items-center justify-center rounded-xl
            ${isActive ? "text-[#00d5ff]" : "text-gray-500 hover:text-white"}
          `}
                >
                  {/* TOOLTIP */}
                  {isHovered && (
                    <div
                      className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-3 py-1 
               bg-transparent backdrop-blur-3xl text-white text-sm rounded-md shadow-lg whitespace-nowrap
               transition-all duration-300 ease-in-out scale-95 hover:scale-105"
                    >
                      {item.name}
                    </div>
                  )}



                  {isActive && (
                    <div className="absolute inset-0 bg-[#00d5ff]/10 rounded-xl blur-md" />
                  )}

                  <Icon
                    icon={item.icon}
                    width={22}
                    className={`relative transition-transform ${isActive || isHovered ? "scale-110" : ""
                      }`}
                  />

                  {isActive && (
                    <div className="absolute -right-1 w-3 h-3 bg-[#00d5ff] rounded-full border-2 border-[#111C44]" />
                  )}
                </Link>

                {/* TOOLTIP */}
                {isHovered && (
                  <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-3 py-1 bg-[#111C44] text-white text-sm rounded-md shadow-lg whitespace-nowrap">
                    {item.name}
                  </div>
                )}
              </div>
            );
          })}
        </nav>


        {/* SETTINGS */}
        {/* <div className="mb-16">
          <Icon icon="solar:settings-bold" width={20} className="text-gray-500" />
        </div> */}
      </aside>
    </>
  );
};

export default Sidebar;
