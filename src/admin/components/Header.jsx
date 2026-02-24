import { Menu, LogOut } from "lucide-react";
import { Icon } from "@iconify/react";
import { useSelector, useDispatch } from "react-redux";
import { adminLogout } from "../../Redux/slice/authSlice";
import { useNavigate } from "react-router-dom";

const Header = ({ toggleSidebar, theme, setTheme }) => {
  const { admin } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(adminLogout());
    navigate("/login");
  };

  // Helper to safely get the first letter
  const getFirstLetter = (name) => {
    if (!name) return "A"; // Fallback
    return name.charAt(0).toUpperCase();
  };

  // Determine the name to display
  // Supports various API response structures (admin.admin.name, admin.name, admin.user.name)
  const userName = admin?.admin?.name || admin?.name || admin?.user?.name || "Admin";

  return (
    <header className="fixed top-0 right-0 z-40 
      bg-[#020523]/80 backdrop-blur-xl border-b border-white/10 px-4 py-3
      w-full md:w-[calc(100%-91px)] md:ml-[91px]"
    >
      <div className="w-full flex items-center justify-between">

        {/* Left Side: Toggle + Search */}
        <div className="flex items-center gap-3 sm:gap-4 flex-1">
          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white"
            onClick={toggleSidebar}
          >
            <Menu size={26} />
          </button>

          {/* Search Bar */}
          <div className="relative w-full sm:w-[250px] md:w-[350px] lg:w-[400px]">
            <input
              type="text"
              placeholder="Search ..."
              className="w-full bg-[#020523] backdrop-blur-md 
                text-white placeholder-gray-400
                pl-12 pr-6 py-3 rounded-xl
                focus:outline-none focus:ring-2 focus:ring-cyan-400/50 
                focus:border-cyan-400/50 focus:bg-white/5
                transition-all duration-300 text-sm sm:text-base"
            />
            <Icon
              icon="mynaui:search"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            />
          </div>
        </div>

        {/* Right Side: Icons + Avatar */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-5">
          {/* Theme Toggle */}
          {/* <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-white/10 transition-all"
          >
            <Icon
              icon={theme === "light" ? "solar:moon-bold" : "solar:sun-bold"}
              width={24}
              height={24}
              className="text-gray-300"
            />
          </button> */}

          {/* Notifications */}
          {/* <button className="p-2 rounded-lg hover:bg-white/10 transition-all relative">
            <Icon icon="clarity:notification-solid" width={24} height={24} className="text-gray-300" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </button> */}

          {/* User Avatar */}
          <div className="flex items-center justify-center w-10 h-10 rounded-full 
            bg-gradient-to-br from-cyan-400 to-blue-600 text-white font-bold text-lg
            shadow-lg shadow-cyan-500/30 border-2 border-white/20">
            {getFirstLetter(userName)}
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-10 h-10 rounded-full
              bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-500
              border border-white/10 hover:border-red-500/50
              transition-all duration-300 group relative"
            title="Logout"
          >
            <LogOut size={20} />
            <span className="absolute -bottom-10 right-0 scale-0 group-hover:scale-100 
              bg-red-500 text-white text-[10px] px-2 py-1 rounded-md
              transition-all duration-200 pointer-events-none whitespace-nowrap">
              Logout
            </span>
          </button>
        </div>

      </div>
    </header>
  );
};

export default Header;
